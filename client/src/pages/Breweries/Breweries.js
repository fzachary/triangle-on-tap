import React, { Component } from "react";
import API from "../../utils/API";
import MapContainer from '../../components/Map';
import Wrapper from "../../components/Wrapper";
import NestedList from "../../components/List";
import { Col, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import CardBtn from "../../components/CardBtn";
import "./style.css";

class Breweries extends Component {
  state = {
    breweries: [],
    name: "",
    city: "",
    date: ""
  };

  componentDidMount() {
    this.loadBreweries();
    console.log(this.state);
  }

  loadBreweries = () => {
    API.getBreweries()
      .then(res =>
        this.setState({ breweries: res.data.breweries, name: "", city: "", date: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBrewery = id => {
    API.deleteBrewery(id)
      .then(res => this.loadBreweries())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    console.log(value);
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    if (this.state.name && this.state.city) {
      API.saveBrewery({
        name: this.state.name,
        city: this.state.city,
        date: this.state.date
      })
        .then(res => this.loadBreweries())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div style={{margin: 30, padding: 30}}>
      <Container>
          <Col>
            <h1 align="center">Beer Search</h1>
            <div align="center">
              <CardBtn style={{margin: 10}}>Cary</CardBtn>
              <CardBtn style={{margin: 10}}>Apex</CardBtn>
              <CardBtn style={{margin: 10}}>Raleigh</CardBtn>
              <CardBtn style={{margin: 10}}>Durham</CardBtn>
            </div>
            <form>
              <Input 
              value = {this.state.name}
              onChange={this.handleInputChange}
              name="text"
              placeholder="Search town or brewery name here"
              />
              <FormBtn
                disabled={!(this.state.name && this.state.city)}
                onClick={this.handleFormSubmit}>
                Search
              </FormBtn>
            </form>
          </Col>
      </Container>

      <Container>
          <Col>
            <Wrapper>
              <Col size="md-3">
                <MapContainer /> 
              </Col>
            </Wrapper>
          </Col>
          <Col>
          <Wrapper>
            <NestedList>

            </NestedList>
          </Wrapper>
          </Col>
      </Container>
      </div>


      // <Container fluid>
      //   <Row>
      //     <Col size="md-6">
      //       <Jumbotron>
      //         <h1>Breweries</h1>
      //       </Jumbotron>
      //       <form>
      //         <Input
      //           value={this.state.name}
      //           onChange={this.handleInputChange}
      //           name="name"
      //           placeholder="Name (required)"
      //         />
      //         <Input
      //           value={this.state.city}
      //           onChange={this.handleInputChange}
      //           name="city"
      //           placeholder="City (required)"
      //         />
      //         <TextArea
      //           value={this.state.date}
      //           onChange={this.handleInputChange}
      //           name="date"
      //           placeholder="Date (Optional)"
      //         />
      //         <FormBtn
      //           disabled={!(this.state.name && this.state.city)}
      //           onClick={this.handleFormSubmit}
      //         >
      //           Submit Brewery
      //         </FormBtn>
      //       </form>
      //     </Col>
      //     <Col size="md-6 sm-12">
      //       <Jumbotron>
      //         <h1>Breweries On My List</h1>
      //       </Jumbotron>
      //       {this.state.breweries.length ? (
      //         <List>
      //           {this.state.breweries.map(brewery => (
      //             <ListItem key={brewery._id}>
      //               <Link to={"/breweries/" + brewery._id}>
      //                 <strong>
      //                   {brewery.name} by {brewery.city}
      //                 </strong>
      //               </Link>
      //               <DeleteBtn onClick={() => this.deleteBrewery(brewery._id)} />
      //             </ListItem>
      //           ))}
      //         </List>
      //       ) : (
      //         <h3>No Results to Display</h3>
      //       )}
      //     </Col>
      //   </Row>
      // </Container>
    );
  }
}

export default Breweries;
