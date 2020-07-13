import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";

import { db } from "../firebase.js";
class AddMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:"",
      firstName:"",
      lastName:"",
      memberType: "",
      contractDuration: "",
      trainerAuth:false,
      memberRfidId:""
    }
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  handleChangeRfidTrainer = (event) => {
    this.setState({
      memberRfidId:event.target.value
    })
  }
  closeValidationModal = () => {
    const location = {
      pathname: '/admin/dashboard',
      state: { fromMember: true }
    }
    this.props.history.push(location);
  }
  checkForTrainerId = () => {
    console.log("Id : ",this.state.memberRfidId);
      db.collection("members")
      .where("Type", "==", "Trainer")
      .where("RFID_ID", "==", this.state.memberRfidId)
      .get()
      .then(querySnapshot => {
          if (querySnapshot.empty) {
            console.log('No matching documents.');
          } else {            
            const data = querySnapshot.docs.map(doc => doc.data());
            console.log("data :",data);
            this.setState({
              trainerAuth:true
            });
          }
      });
  }
  render() {
    return (
      <>
        <div className="content">         
          <Modal isOpen={!this.state.trainerAuth}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Validation Trainer
              </h5>
            </div>
            <ModalBody>
              <FormGroup>
                <label>Enter Your RFID ID</label>
                <Input
                  defaultValue=""
                  placeholder="RFID ID"
                  type="text"
                  name="RFID_ID"
                  className="custom-input"
                  onChange={this.handleChangeRfidTrainer}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={this.closeValidationModal}>
                  Go To Dashboar
                </Button>
                <Button color="primary" onClick={this.checkForTrainerId}>
                  Check
                </Button>
            </ModalFooter>
        </Modal>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Add Member</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Id</label>
                          <Input
                            defaultValue=""
                            placeholder="Id"
                            type="text"
                            name="id"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            defaultValue=""
                            placeholder="First Name"
                            type="text"
                            name="firstName"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Last Name
                          </label>
                          <Input placeholder="LastName" type="text" 
                            name="lastName"
                            onChange={this.handleChange}/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <div className="form-group">
                            <label>
                              Member Type
                              <br/>
                              <select className="form-control" name="memberType" onChange={this.handleChange} value={this.state.memberType}>
                                <option value="">Select Member Type</option>
                                <option value="premium">Premium</option>
                                <option value="regular">Regular</option>
                              </select>
                            </label>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <div className="form-group">
                            <label>
                              Contract Duration
                              <br/>
                              <select className="form-control" name="contractDuration" onChange={this.handleChange} value={this.state.contractDuration}>
                                <option value="">Select Contract Duration</option>
                                <option value="premium">12 month</option>
                                <option value="regular">6 month</option>
                                <option value="regular">3 month</option>
                              </select>
                            </label>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default AddMember;
