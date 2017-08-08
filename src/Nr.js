import React, { Component } from 'react';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Nr extends Component {
  constructor(){
    super()
    this.state={
      da:{}
    }
  }
  componentDidMount(){
    $.ajax({
      url:"http://localhost:8400/news/listxq",
      type:"post",
      data:{
      	id:this.props.match.params.id.split(":")[1]
      },
      success:function (e){
        // console.log(e)
        this.setState({
          da:e[0]
        })
      }.bind(this)
    })
  }
  render() {
  	return <div>{this.state.da.content}</div>
  }
}

export default Nr