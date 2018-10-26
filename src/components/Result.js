import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';

const Result = ({ id, kitty }) => (
  <Row className="justify-content-center my-2">
    <Col lg={9} sm={12}>
      <Card>
        <CardBody>
          <CardImg
            top
            height="200px"
            src={`https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/${id}.svg`}
          />
          <ListGroup>
            <ListGroupItem>
              <ListGroupItemHeading className="text-info">
                Gene
              </ListGroupItemHeading>
              <ListGroupItemText>
                {(kitty && kitty.genes) || ''}
              </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem>
              <ListGroupItemHeading className="text-info">
                Generation
              </ListGroupItemHeading>
              <ListGroupItemText>
                {(kitty && kitty.generation) || ''}
              </ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem>
              <ListGroupItemHeading className="text-info">
                Birth Time
              </ListGroupItemHeading>
              <ListGroupItemText>
                {(kitty &&
                  kitty.birthTime &&
                  moment.unix(kitty.birthTime).format('MMMM DD YYYY')) ||
                  ''}
              </ListGroupItemText>
            </ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  </Row>
);

Result.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  kitty: PropTypes.object.isRequired
};

export default Result;
