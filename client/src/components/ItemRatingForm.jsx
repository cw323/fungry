import React from 'react';
import styled from 'styled-components';
import GooglePlaces from './GooglePlaces.jsx';

const FormContainer = styled.form`
  width: 400px;
  padding: 10px;
`;

const InputContainer = styled.input`
  width: 350px;
`;

const TextArea = styled.textarea`
  width: 350px;
  height: 100px;
`;

class ItemRatingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place_id: '',
      place_name: '',
      category: [],
      address: [],
      item: '',
      rating: '10',
      comment: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAddress = this.getAddress.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    this.props.getForm(this.state);
    event.preventDefault();
  }

  getAddress(result) {
    let place = result.address.split(',');
    this.setState({
      place_id: result.result[0].place_id,
      place_name: place[0],
      category: result.result[0].types,
      address: result.result[0].address_components,
    });
  }

  render() {
    return (
      <FormContainer onSubmit={this.handleSubmit}>
        Establishment:
        <br />
        <GooglePlaces getAddress={this.getAddress}/>
        <br />
        <label>
          Item:<br />
          <InputContainer
            name="item"
            placeholder="Iced Latte"
            type="string"
            value={this.state.item}
            onChange={this.handleChange} />
        </label>
        <br />
        <br />
        <label>
          Rating:
          <select name="rating" value={this.state.rating} onChange={this.handleChange}>
            <option value="10">10</option>
            <option value="9">9</option>
            <option value="8">8</option>
            <option value="7">7</option>
            <option value="6">6</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </label>
        <br />
        <br />
        <label>
          Comment:<br />
          <TextArea name="comment" placeholder="So delicious! The coffee is very fragrant and I love that they use organic milk. My fav latte so far, best with no ice and extra milk!" value={this.state.comment} onChange={this.handleChange} />
        </label>
        <br />
        <br />
        <input type="submit" value="Save" />
      </FormContainer>
    );
  }
}

export default ItemRatingForm;