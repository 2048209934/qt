import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nr from './Nr'
import $ from 'jquery';
import { Button } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  constructor(){
    super()
    this.state={
      arr:[],
      id:'',
      dad:{}
    }
  }
  componentDidMount(){
    $.ajax({
      url:"http://localhost:8400/news/list",
      type:"post",
      success:function (e){
        // console.log(e)
        this.setState({
          arr:e
        })
      }.bind(this)
    })
  }
  sc=function (event){
    var id=event.target.parentElement.children[0].innerHTML
    $.ajax({
      url:"http://localhost:8400/news/listsc",
      type:"post",
      data:{
        id:id
      },
      success:function (e){
        // console.log(e)  
        this.setState({
          arr:e
        })    
      }.bind(this)
    })
  }.bind(this)
  xg=function (event){
    $(".mask").show()
    this.setState({
      id:event.target.parentElement.children[0].innerHTML
    })
    $.ajax({
      url:"http://localhost:8400/news/listxq",
      type:"post",
      data:{
        id:event.target.parentElement.children[0].innerHTML
      },
      success:function (e){
        // console.log(e)
        this.setState({
          dad:e[0]
        })
        $(".title").val(this.state.dad.title)
        $(".content").val(this.state.dad.content)
      }.bind(this)
    })
  }.bind(this)
  qd=function (){
    if ($(".title").val()==''||$(".content").val()=='') {
      alert("请输入内容")
    }else{
      $.ajax({
        url:"http://localhost:8400/news/listxg",
        type:"post",
        data:{
          id:this.state.id,
          title:$(".title").val(),
          content:$(".content").val()
        },
        success:function (e){
          console.log(e)  
          this.setState({
            arr:e
          })    
          $(".mask").hide()
          $(".title").val('')
          $(".content").val('')
        }.bind(this)
      })
    }
  }.bind(this)
  qx=function (){
    $(".mask").hide()
  }.bind(this)
  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/"></Link>
            <Route exact path='/' render={() => (
              <div>
                {
                  this.state.arr.map(function (v,i){
                    return <p key={i}>
                      <span id="id">{v.id}</span>
                      <Link to={`/nr:${v.id}`}>{v.title}</Link>
                      <button onClick={this.xg}>修改</button>
                      <button onClick={this.sc}>删除</button>
                    </p>
                  }.bind(this))
                }
                <div className="mask">
                  <div className="alert">
                    <span>title:</span><input className="title" type="text"/>
                    <span>content:</span><input className="content" type="text"/>
                    <button onClick={this.qd}>确定</button>
                    <button onClick={this.qx}>取消</button>
                  </div>
                </div>
              </div>          
            )} />
              
            <Route path="/:id" component={Nr} />
        </div>
      </Router>
    );
  }
}

export default App;
