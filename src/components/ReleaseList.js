import React from 'react';

import ProgressBar from './ProgressBar';

import '../App.css';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      errors: {},
    };
  }

  handleEdit = (key) => {
    let data = this.state.data;
    data[key].isEditActive = true;
    this.setState({
      data: data
    });
  }

  handleDone = (key) => {
    let data = this.state.data;
    data[key].isEditActive = false;
    this.setState({
      isEditActive: false
    });
  }

  handleDelete = (key) => {
    let array = this.state.data;
    array.splice(key, 1);
    console.log(array);
    this.setState({
      data: array,
    });
  }

  handleValidation = (inputValues) => {
    let Isvalid = true;
    let errors = {};
    if(!inputValues.version) {
      Isvalid = false;
      errors.version = "Required";
    }

    // if(!inputValues.progress) {
    //   Isvalid = false;
    //   errors.progress = "Required";
    // }

    if (inputValues.progress < 0 || inputValues.progress > 100) {
      Isvalid = false;
      errors.progress = "Enter a valid progress";
    }

    this.setState({errors: errors});
    return Isvalid;
  }

  handleClick = (event) => {
    let progress = parseInt(document.getElementById("progress").value);
    // status: (progress === 0 ) ? "IN PROGRESS": progress === 100 ? "RELEASED" : "UNRELEASED", 
    let inputValues = {
      version: document.getElementById("version").value,
      progress: progress,
      status: progress === 100  ? "RELEASED" : (progress >= 0 && progress <= 100) ? "UNRELEASED" :"IN PROGRESS", 
      start_date: document.getElementById("s_date").value,
      release_date: document.getElementById("r_date").value,
      description: document.getElementById("des").value,
      isEditActive: false
    }
    if (this.handleValidation(inputValues)) {
      this.setState ({
        data: [...this.state.data,
          inputValues]
      });
    }
    // else {
    //   alert("Please Enter reuired information");
    // }
  }

  render () {
    const bgColor = {
      "IN PROGRESS": "DodgerBlue",
      "RELEASED": "MediumSeaGreen",
      "UNRELEASED": "Tomato"};

    return (
      <div className="List">
          <table>
            <thead >
              <tr>
                <th>Version</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Start date</th>
                <th>Release date</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <br />
            <tbody>
            {this.state.data.length > 0 ? (this.state.data.map ((item, key) => {
                  let progress = parseInt(item.progress);
                  return(
                  <tr key={key}>
                    <td contentEditable={item.isEditActive}>{item.version}</td>
                    <td contentEditable={item.isEditActive} style={{"backgroundColor":bgColor[item.status], fontWeight: "bold"}}>{item.status}</td>
                    <td contentEditable={item.isEditActive}>
                    <ProgressBar value={progress} />
                    </td>
                    <td contentEditable={item.isEditActive}>{item.start_date ? item.start_date : "--"}</td>
                    <td contentEditable={item.isEditActive}>{item.release_date ? item.release_date : "--"}</td>
                    <td contentEditable={item.isEditActive}>{item.description ? item.description : "--"}</td>
                    <td>
                      {
                        item.isEditActive ?
                        <div><button onClick={() => this.handleDone(key)}>Done</button></div> :
                        <div><button onClick={() => this.handleEdit(key)}>Edit</button><button onClick={() => this.handleDelete(key)}>Delete</button></div>
                      }
                    </td>
                  </tr>
                  );
                })) : null }         
            </tbody>
            <tfoot>    
              <tr>
                <td colSpan="2">
                  <input placeholder="Version name" type="text" id="version" />
                  <span className="error">{this.state.errors["version"]}</span>
                </td>
                <td>
                  <input placeholder="Progress" type="number" id="progress" min={0} max={100} />                
                  <span className="error">{this.state.errors["progress"]}</span>
                </td>
                <td><input placeholder="Start date" type="Date" id="s_date"></input></td>
                <td><input placeholder="Release date" type="date" id="r_date"></input></td>
                <td><input placeholder="Description" id="des"></input></td>
                <td>
                  <button className="Addbutton" onClick={() => this.handleClick()}>Add</button>
                </td>
              </tr>
            </tfoot>
          </table>
      </div>
    );
  }
}