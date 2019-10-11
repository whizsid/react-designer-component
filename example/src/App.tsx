import React from "react";
import Designer from "../../src/Designer";
import {DesignerItem} from "../../src/types";

interface IState {
  items: DesignerItem[];
}

class App extends React.Component <{},IState> {

  constructor(props:{}){
    super(props);

    this.state = {
      items:[]
    };
  }

  public render(){
    const {items} = this.state;

    return (
      <div>
        <Designer
          items={items}
          onChangeItems={this.handleChangeItems}
        />
      </div>
    );
  }


  protected handleChangeItems(items:DesignerItem[]){
    this.setState({items});
  }
}

export default App;
