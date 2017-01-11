/*globals React*/
const LotQueue = require('./lotQueue');
const Vehicle = require('./vehicle');
const ParkingLot = React.createClass({
  getInitialState: function(){
    return {
      slots: [],
      size: this.props.size||10,
      queue:[]
    }
  },
  createLot: function(param){
    if(param.data){
      const slots = param.data.map(function(v){
        return {type:Math.ceil(Math.random()*3), value:v};
      });
      this.setState({slots,size:slots.length});
    }else if(param.num || param.num != null){
      this.setState({size: param.num, slots:[]});
    }
  },
  canPark: function(type){
    return this.state.slots.find(function(e){
      return e.value === 0 && e.type >= type;
    });
  },
  park: function(type){
    const slot = this.canPark(type);
    const id = (slot||{}).id;
    if(!this.isFull() && id != null){
      const slots = this.state.slots;
      slots[id].value = type;
      this.setState({slots});
    }
  },
  isFull: function(){
    return !(this.state.slots.some(function(e){
      return e.value === 0;
    }));
  },
  removeCar: function(id){
    const slots = this.state.slots;
    slots[id].value = 0;
    delete slots[id].data;
    this.setState({slots});
  },
  query: function(obj){
    let query = '';
    for(const i in obj){
      query+=`${i}=${JSON.stringify(obj[i])}&`;
    }
    return query.substring(0,query.length-1);
  },
  saveState: function(){
    let id;
    if(localStorage.pid)id = localStorage.pid;
    else{
      id = new Date().getTime();
      localStorage.pid = id;
    }
    const data = {d:this.state.slots,q:this.queueBox.state.queue};
    localStorage.data = JSON.stringify(data);
    //ajax('POST','/save', this.query({id, data}), this.load, 'json');
  },
  load: function(data){
    if(data)this.setState({slots:data.d, queue: data.q});
  },
	loadState: function(){
    // ajax('GET','/fetch',this.query({id:localStorage.pid}),this.load,'json');
		if(localStorage.data)this.load(JSON.parse(localStorage.data));
	},
  componentDidMount: function(){
    this.loadState();
    window.onunload = () => {
      this.saveState();
    }
    window.park = this;
  },
  render: function(){
    let slotsData;
    if(this.state.slots.length>0){
      slotsData = this.state.slots;
    }else{
      slotsData = Array(this.state.size).fill(0).map((v, i) => {
        const obj = {id: i, type:Math.ceil(Math.random()*3), value:v};
        this.state.slots.push(obj);
        return obj;
      });
    }
    let car;
    const lots = slotsData.map((slot, i) => {
      if(slot.value)car = React.createElement(Vehicle,{lot:i, ref:(carBox) => { if(carBox){carBox.par = this;}}, type:slot.value});
      else car = null;

      return React.createElement('div',{key: i, className:`lot${slot.type}`},
        car
      );
    });
    return React.createElement('div',{
			className: 'mainLot'
  		},
      React.createElement('div',{className:'lotBox'},
        lots
      ),
      React.createElement('div',{className:'queueRoad'},
        React.createElement('div',{className:'buttons'},
          React.createElement('div',{
            className:'saveButton',
            onClick:() => {
              this.saveState();
            }
          },'Save'),
          React.createElement('div',{
            className:'queueButton',
            onClick:() => {
              this.queueBox.add();
            }
          },'Add Car')
        ),
        React.createElement(LotQueue,{
          queue:this.state.queue,
          ref:(queueBox) => { if(queueBox){queueBox.par = this;this.queueBox = queueBox;} },
        })
      ),
      React.createElement('pre',{},`Blue lot = Truck(3), Grey lot = Motorcycle(1), Green lot = Car(2). \n
Click a car to delete.\n
You can modify the number of lots and specify lot type using park.createLot(param) in the console.\n
param is an object with two attributes;
  1.) data: array of lot types (1,2,3);
  2.) num: integer for number of lots with random types`)
    );
  }
});

const ajax = function(req, url, query, callback, type){
  const xmlhttp = new XMLHttpRequest();
  if(type)xmlhttp.responseType = type;
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if(callback)callback(this.response);
    }
  };
  if(req === 'GET'){
    xmlhttp.open(req, url+(query?`?${query}`:''), true);
    xmlhttp.send();
  }else if(req === 'POST'){
    xmlhttp.open(req, url, true);
    xmlhttp.send(query);
  }
};

module.exports = ParkingLot;
