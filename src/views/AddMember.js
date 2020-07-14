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
  Alert,
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
      memberRfidId:"",
      errorMessage:"",
      formErrorMessage:"",
      formSuccessMessage:""
    }
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value,
      formErrorMessage:"",
      formSuccessMessage:""
    });
  }
  handleChangeRfidTrainer = (event) => {
    this.setState({
      memberRfidId:event.target.value,
      errorMessage:""
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
      db.collection("members")
      .where("Type", "==", "trainer")
      .where("RFID_ID", "==", this.state.memberRfidId)
      .get()
      .then(querySnapshot => {
          if (querySnapshot.empty) {
            this.setState({
              errorMessage: "Your RFID ID wrong please check again"
            })
          } else {            
            const data = querySnapshot.docs.map(doc => doc.data());
            console.log("data :",data);
            this.setState({
              trainerAuth:true
            });
          }
      });
  }
  addNewMember = () => {
    if(!this.state.id){
      this.setState({
        formErrorMessage:"Id is required"
      });
      return;
    }
    if(!this.state.firstName){
      this.setState({
        formErrorMessage:"First Name is required"
      });
      return;
    }
    if(!this.state.lastName){
      this.setState({
        formErrorMessage:"Last Name is required"
      });
      return;
    }
    if(!this.state.memberType){
      this.setState({
        formErrorMessage:"Member Type is required"
      });
      return;
    }
    if(!this.state.contractDuration){
      this.setState({
        formErrorMessage:"Contract Duration is required"
      });
      return;
    }
    db.collection("members")
      // .where("Type", "==", this.state.memberType)
      .where("RFID_ID", "==", this.state.id)
      .get()
      .then(querySnapshot => {
          if (querySnapshot.empty) {
            this.addMemberInDb();
          } else {            
            this.setState({
              formErrorMessage:"RFID Id is already exist please select another Id"
            });
          }
      });
  }
  addMemberInDb = () => {
    // Contract_Duration
    var date = new Date();
    var newDate = new Date(date.setMonth(date.getMonth()+parseInt(this.state.contractDuration)));
    var data = {
      "RFID_ID":this.state.id,
      "Name":this.state.firstName + " " + this.state.lastName,
      "Type":this.state.memberType,
      "Credits":this.state.memberType === "regular" ? 0 : -1,
      "Registration_date":new Date(),
      "Contract_Duration":newDate
    }
    db.collection("members").doc(new Date().getTime().toString()).set(data)
    .then(() => {      
      this.setState({
        formSuccessMessage:"Success! New member added successfully"
      });
    })
    .catch(function(error) {
        this.setState({
          formErrorMessage:"Something wrong please try again"
        });
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
              {this.state.errorMessage && (
                <Alert color="danger">{this.state.errorMessage}</Alert>
              )}
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
                    {this.state.formErrorMessage && (
                      <Alert color="danger">{this.state.formErrorMessage}</Alert>
                    )}
                    {this.state.formSuccessMessage && (
                      <Alert color="success">{this.state.formSuccessMessage}</Alert>
                    )}
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
                                <option value="trainer">Trainer</option>
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
                                <option value="12">12 month</option>
                                <option value="6">6 month</option>
                                <option value="3">3 month</option>
                              </select>
                            </label>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit" onClick={this.addNewMember}>
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
