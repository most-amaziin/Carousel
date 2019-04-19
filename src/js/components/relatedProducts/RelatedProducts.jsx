import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ProductList from '../productList/ProductList.jsx';
// import ItemCarousel from '../itemCarousel/ItemCarousel.jsx';
import $ from 'jquery';

export default class RelatedProducts extends Component {
  constructor(props){
    super(props);

    this.state = {
      entries: ['Howdy', `Yee'Haw`, 'Steak', 'Moose'], // dummy data
      mountStatus: false,
    }

    this.timer = null;
    this.buttonLeftClick = this.buttonLeftClick.bind(this);
    this.buttonRightClick = this.buttonRightClick.bind(this);
    this.buttonEndClick = this.buttonEndClick.bind(this);
  }

  //request data upon mounting
  componentDidMount(){
    window.addEventListener('updateProdId', this.getProductsFromAPI.bind(this));
    console.log('Initializing.');
    this.getProductsFromAPI();
  }

  getProductsFromAPI(){
    $.get('http://localhost:4444/api/products', (data) => {
      console.log('GOT DATA!: ', data);
      this.setState({
        entries: data, 
        mountStatus: true
      });
    });
  }

  //method for scrolling left
  buttonLeftClick(){
    document.getElementById("ProductList").scrollLeft -= 400;
    this.timer = setTimeout(this.buttonLeftClick, 800);
  }

  //method for scrolling right
  buttonRightClick(){
    document.getElementById("ProductList").scrollLeft += 400;
    this.timer = setTimeout(this.buttonRightClick, 800);
  }

  //endscroll method for onMouseUp and onMouseLeave
  buttonEndClick(){
    clearTimeout(this.timer);
  }

  //dispatch event for other components that are listening for statechange
  productClick(id){
    window.scrollTo(0,0);
    window.dispatchEvent(
      new CustomEvent('updateProdId', {detail: id})
      );
  }

  handleNewGetRequest(){
    document.getElementById("ProductList").scrollLeft = 0;
  }

  render() {
    const noPage = (<div> Loading ...  </div>);
    const productsList = (<ProductList entries={this.state.entries} 
                            handleButtonLeft={this.buttonLeftClick.bind(this)} 
                            handleButtonRight={this.buttonRightClick.bind(this)}
                            handleMouseUp={this.buttonEndClick.bind(this)}
                            handleProductClick={this.productClick.bind(this)}
                            handleNewGetRequest={this.handleNewGetRequest.bind(this)}/>)
    if (this.state.mountStatus === true){
      return (
        <div className="CAB-Panel">
          <p className="CAB-Text">Customers who have bought this item also bought</p>

          <div className="RelatedProducts-App-Container">
            {productsList}
          </div>

        </div>
      );
    } else {
      return (
        <div>
          {noPage}
        </div>
      );
    }
  }
}

ReactDOM.render(<RelatedProducts/> , document.getElementById('relatedProducts'));