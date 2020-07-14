
import React from "react";

import {
  Button,
  Label,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Row,
  Col,
  Modal,
  ModalBody,
  Alert,
  ModalFooter
} from "reactstrap";

import { db } from "../firebase.js";

class IdleMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberData:[],
      memberAuth:false,
      memberRfidId:""
    }
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
      .where("Type", "in", ['premium','regular'])
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
              memberAuth:true,
              memberData:data[0]
            });
          }
      });
  }

  handleChangeRfidTrainer = (event) => {
    this.setState({
      memberRfidId:event.target.value
    })
  }
  render() {
    return (
      <>
        <div className="content">         
          <Modal isOpen={!this.state.memberAuth}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Validation Member
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
                  <h5 className="title">Member Details</h5>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label for="disabled">Name</Label>
                    <Input type="text" id="disabled" placeholder="Disabled input" value={this.state.memberData.Name}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="disabled">RFID ID</Label>
                    <Input type="text" id="disabled" placeholder="Disabled input" value={this.state.memberData.RFID_ID}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="disabled">Type</Label>
                    <Input type="text" id="disabled" placeholder="Disabled input" value={this.state.memberData.Type}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="disabled">Credits</Label>
                    <Input type="text" id="disabled" placeholder="Disabled input" value={this.state.memberData.Credits}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="disabled">Registration Date</Label>
                    <Input type="text" id="disabled" placeholder="Disabled input" value={this.state.memberData.Registration_date ? new Date(this.state.memberData.Registration_date.toDate()).toDateString() : '-'}/>
                  </FormGroup>
                   <FormGroup>
                    <Label for="disabled">Contract Duration</Label>
                    <Input type="text" id="disabled" placeholder="Disabled input" value={this.state.memberData.Contract_Duration ? new Date(this.state.memberData.Contract_Duration.toDate()).toDateString() : '-'}/>
                  </FormGroup>
                   <FormGroup>
                    <Label for="disabled">Last Visit</Label>
                    <Input type="text" id="disabled" placeholder="Disabled input" value={this.state.memberData.Last_visit ? new Date(this.state.memberData.Last_visit.toDate()).toDateString() : '-'}/>
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default IdleMode;
