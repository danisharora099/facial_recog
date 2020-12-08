import React, { Component } from 'react';
import web3 from './web3'
import './App.css';
import CollegeInstance from './college'
import Navbar from './Navbar'
import Spinner from './Spinner'
import Main from './Main'


class App extends Component {

  async componentWillMount() {
    // await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    //const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })
    // const networkId = await web3.eth.net.getId()
    // const networkData = College.networks[networkId]
    // if (networkData) {
      // const college = web3.eth.Contract(College.abi, networkData.address)
      // this.setState({ college })
      const studentCount = await CollegeInstance.methods.studentCount().call()
      this.setState({ studentCount })
      // Load students
      for (var i = 1; i <= studentCount; i++) {
        const student = await CollegeInstance.methods.students(i).call()
        this.setState({
          students: [...this.state.students, student]
        })
      }
      this.setState({ loading: false })
    // } else {
    //   window.alert('College contract not deployed to detected network.')
    // }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      studentCount: 0,
      students: [],
      loading: true,
      buffer: null
    }

    this.addStudent = this.addStudent.bind(this)
  }

 async addStudent(name, image, rollno, _class) {
    this.setState({ loading: true })
    await CollegeInstance.methods.createStudent(name, image, rollno, _class).send({from: this.state.account}).once('recipt', (recipt) => {
      this.setState({loading: false})
    })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <br/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="container">
              { this.state.loading
                ? <div> <Spinner/> </div>
                : <Main 
                  students={this.state.students}
                  addStudent={this.addStudent}   
                  />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;