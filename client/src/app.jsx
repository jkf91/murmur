var React = require('react');
var ViewAllMessages = require('./viewAllMessages');
var TopBar = require('./topbar');
var InputBox = require('./inputbox');


var mainView = React.createClass({

  messages: [],
  getInitialState: function(){
    return {
      messages: [],
      sort: 'recent',
      inputBoxDisplay: 'false',
    };
  },

  // Retrieve the messages data from Firebase
  componentWillMount: function(){
    this.firebaseRef = new Firebase('https://fiery-heat-3376.firebaseio.com/Fresh%20Post');
    this.firebaseRef.on('value', function(dataSnapshot){
      this.messages.push(dataSnapshot.val());
      this.setState({
        messages: dataSnapshot.val()
      });
    }.bind(this));
  },

  handleSortRecent: function(){
    this.setState({sort: 'recent'});
  },
  handleSortPopular: function(){
    this.setState({sort: 'popular'});
  },

  render: function(){
    return (
      <div>
        <TopBar/>
        <div>
          <div style={this.styles.filter}>
            <div className="btn-group" style={{ position: "relative", left: "38%"}}>
              <button className="btn btn-default" onClick={ this.handleSortRecent }>New</button>
              <button className="btn btn-default" onClick={ this.handleSortPopular }>Hot</button>
              <button className="btn btn-default">Favorites</button>
              <button className="btn btn-default">My Posts</button>
            </div>
            <InputBox />
          </div>
          <ViewAllMessages sortBy={ this.state.sort } messages={ this.state.messages }/>
        </div>
      </div>
    )
  },
  styles: {
    filter: {
      paddingTop: '80px'
    },
    inputBox: {
      marginTop: '200px'
    }
  }
})


var element = React.createElement(mainView);
React.render(element, document.querySelector('.container'));
