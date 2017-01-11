const Vehicle = require('./vehicle');
const LotQueue = React.createClass({
	getInitialState: function(){
		this.props = this.props || {};
		return {
			queue: []
		};
	},
	add: function(){
		const v = parseInt(prompt('What kind of vehicle, 1, 2 or 3')||'0');
    const queue = this.props.queue;
		queue.push(v);
		this.setState({queue});
  },
	removeCar: function(id){
    const queue = this.props.queue;
		queue.splice(id, 1);
    this.setState({queue});
  },
	load:function(){
		setTimeout(()=>{
			const id = this.props.queue[0];
			if(id > 0 && this.par.canPark(id)){

				this.props.queue.shift();
				this.par.park(id);
			}
		},2000);
	},
	componentDidUpdate: function(){
		this.load();
	},
	render: function(){
		let cars;
		if(this.props.queue.length > 0){
			cars = this.props.queue.map((e, i) => {
				return React.createElement(Vehicle, {ref:(carBox) => { if(carBox){carBox.par = this;}}, lot: i, key: (Math.random() * 10000000).toString(), type: e});
			});
		}
		return React.createElement('div', {
			className: 'road'
			},
			cars
		);
	}
});
module.exports = LotQueue;
