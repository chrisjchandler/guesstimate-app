import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { createDistributionForm, destroyDistributionForm, updateDistributionForm, addMetricInputToDistributionForm } from '../../actions/distribution-form-actions'

class DistributionForm extends Component{
  constructor(props) {
    super(props);
    this.state = {userInput: this.props.value || ''};
  }
  componentDidMount(){
    $(window).on('functionMetricClicked', (a, item) => {this._handleMetricClick(item)})
  }
  componentWillUnmount() {
    $(window).off('functionClicked')
    this.props.dispatch(destroyDistributionForm())
    this.props.onSubmit({value: this._value(), distribution: this.props.distributionForm.distribution})
  }
  _handleMetricClick(item){
    let newInput = this.state.userInput + item.id
    this.setState({userInput: newInput})
  }
  _handleFocus() {
    this.props.dispatch(createDistributionForm(this._value()))
  }
  _handleBlur() {
    this.props.dispatch(destroyDistributionForm())
    this.props.onSubmit({value: this._value(), distribution: this.props.distributionForm.distribution})
  }
  _handleChange() {
    this.props.dispatch(updateDistributionForm(this._value()))
  }
  _handlePress(event) {
    this.setState({userInput: event.target.value});
    this.props.dispatch(updateDistributionForm(this._value()))
  }
  _value() {
    return React.findDOMNode(this.refs.input).value
  }
  render() {
    return(
    <input type="text"
    ref='input'
      placeholder={'value'}
      value={this.state.userInput}
      onFocus={this._handleFocus.bind(this)}
      onChange={this._handlePress.bind(this)}
      className={'hmmm'}
    />
    )
  }
}

function select(state) {
  return {
    distributionForm: state.distributionForm
  }
}

module.exports = connect(select)(DistributionForm);
