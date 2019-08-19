import React from 'react';
import Header from './components/Header';
import Action from './components/Action';
import AddOption from './components/AddOption';
import Options from './components/Options';
import OptionModal from './components/OptionModal';

import './App.css';

class App extends React.Component {

  state = {
    options: [],
    selectedOption: undefined
  };

  handlePick = () => {
    const index = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[index];

    this.setState(() => ({ selectedOption: option }));
  };

  handleAddOption = (option) => {
    if (!option)
      return 'Enter valid value to add item';
    if (this.state.options.indexOf(option) > -1)
      return 'This option already exists';

    this.setState((prev) => ({ options: prev.options.concat(option) }));
  };

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  handleDeleteOption = (option) => {
    this.setState((prev) => ({ options: prev.options.filter((o) => option !== o) }));
  };

  dismissSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  };

  componentDidMount() {
    try {
      const options = JSON.parse(localStorage.getItem('options'));

      if (options)
        this.setState({ options });

    } catch (error) {
      console.error(error);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length)
      localStorage.setItem('options', JSON.stringify(this.state.options));
  };

  render() {
    const subtitle = 'Put your life in the hands of a computer, bro.';
    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
        <OptionModal
          selectedOption={this.state.selectedOption}
          dismissSelectedOption={this.dismissSelectedOption}
        />
      </div>
    );
  }

}
export default App;
