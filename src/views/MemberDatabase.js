
import React from "react";
// reactstrap components
import { Table, Button, Row, Col } from "reactstrap";
import { db } from "../firebase.js";

class MemberDatabase extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      memberList:[]
    }
  }
  componentDidMount = () => {
    db.collection("members")
      // .where("Type", "==", "trainer")
      .get()
      .then(querySnapshot => {
          if (!querySnapshot.empty) {          
            const data = querySnapshot.docs.map(doc => doc.data());
            console.log("data :",data);
            this.setState({
              memberList:data
            });
          }
      });
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
            <Table responsive>
              <thead>
                  <tr>
                      <th className="text-center">#</th>
                      <th>Name</th>
                      <th>RFID ID</th>
                      <th>Credits</th>
                      <th>Type</th>
                      <th>Registration Date</th>
                      <th>Contract Last Date</th>
                      <th>Last Visit</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                {this.state.memberList.map((value, index) => {
                  return (
                  <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td>{value.Name}</td>
                      <td>{value.RFID_ID}</td>
                      <td>{value.Credits}</td>
                      <td>{value.Type}</td>
                      <td>{new Date(value.Registration_date.toDate()).toDateString()}</td>
                      <td>{new Date(value.Contract_Duration.toDate()).toDateString()}</td>
                      <td>{value.Last_visit ? new Date(value.Last_visit.toDate()).toDateString() : '-'}</td>
                      <td>
                          <Button className="btn-icon btn-simple" color="success" size="sm">
                              <i className="fa fa-edit"></i>
                          </Button>{` `}
                          <Button className="btn-icon btn-simple" color="danger" size="sm">
                              <i className="fa fa-times" />
                          </Button>{` `}
                      </td>
                  </tr>
                  )
                })}
              </tbody>
          </Table>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default MemberDatabase;
