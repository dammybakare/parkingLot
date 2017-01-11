const Vehicle = React.createClass({
  getInitialState: function(){
    this.props.type = this.props.type || 1;
    let name, width, height;
    switch(this.props.type){
      case 1: name = 'MotorCycle';width = '20px';height = '5px';break;
      case 3: name = 'Truck';width = '60px';height = '20px';break;
      case 2:
      default: name = 'Car';width = '40px';height = '10px';break;
    }
    return {
      lot: this.props.lot,
      name,
      type: this.props.type,
      width,
      height
    }
  },
  name: function(){
    return this.state.name;
  },
	remove: function(){
	  this.par.removeCar(this.state.lot);
	},
	register: function(param){
	  this.state.lot = param.id;
    this.state.lotType = param.type;
	},
  render: function() {
    return React.createElement('div',{
			style:{width:this.state.width, height: this.state.height},
			className:'vehicle',
			onClick: () => {
				const val = confirm('Delete selected vehicle?');
				if(val)this.remove();
			}
		});
  }
});
module.exports = Vehicle;
