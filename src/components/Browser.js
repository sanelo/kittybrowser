import React, { Component } from 'react';
import { object } from 'prop-types';
import Web3 from 'web3';
import {
  Container,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import KittyCoreABI from '../contracts/KittyCoreABI.json';
import { CONTRACT_NAME, CONTRACT_ADDRESS } from '../config';
import Result from './Result';

class Browser extends Component {
  state = {
    id: 0,
    kitty: {},
    totalKitties: 1126383 // last checked default as fallback
  };

  componentDidMount() {
    const web3 = new Web3(window.web3.currentProvider);

    // Initialize the contract instance

    const kittyContract = new web3.eth.Contract(
      KittyCoreABI, // import the contracts's ABI and use it here
      CONTRACT_ADDRESS
    );

    // Add the contract to the drizzle store
    const { drizzle } = this.context;

    drizzle.addContract({
      contractName: CONTRACT_NAME,
      web3Contract: kittyContract
    });

    // Get total kitties and set to state
    this.getTotalKitties(kittyContract);
  }

  getTotalKitties = async kittyContract => {
    const totalKitties = await kittyContract.methods.totalSupply().call();

    this.setState({ totalKitties });
    this.getKitty(totalKitties); // Fetch the last kitty as default view
    return totalKitties;
  };

  getKitty = async id => {
    const { drizzle } = this.context;
    const { CryptoKitties } = drizzle.contracts;
    const { totalKitties } = this.state;

    if (!id && id > totalKitties) {
      return null;
    }

    const kitty = await CryptoKitties.methods.getKitty(id).call();
    this.setState({ id, kitty });

    return kitty;
  };

  handleSearchKitty = event => {
    event.preventDefault();
    const id = event.target.kittyID.value;

    return id ? this.getKitty(id) : null;
  };

  handleRandomKitty = () => {
    const { totalKitties } = this.state;
    const randomId = Math.floor(Math.random() * totalKitties);
    this.getKitty(randomId);
  };

  render() {
    const { totalKitties } = this.state;
    return (
      <Container>
        <Row className="justify-content-center">
          <h1>Kitty Browser</h1>
        </Row>

        {/* Search Input & Random Kitty Button */}
        <Row className="justify-content-center my-3">
          <Form inline onSubmit={this.handleSearchKitty}>
            <FormGroup className="m-2">
              <Label for="kittyID" className="mr-sm-2">
                Kitty ID:
              </Label>
              <Input
                type="number"
                id="kittyID"
                placeholder={totalKitties}
                max={totalKitties}
              />
            </FormGroup>
            <Button className="mr-2">Search Kitty</Button>
            <Button onClick={this.handleRandomKitty}>Random Kitty</Button>
          </Form>
        </Row>

        <Result {...this.state} />
      </Container>
    );
  }
}

Browser.contextTypes = {
  drizzle: object
};

export default Browser;
