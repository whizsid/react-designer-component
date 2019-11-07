import React from "react";
import ReactJson from "react-json-view";
import Designer from "../../src/Designer";
import { DesignerItem } from "../../src/types";

interface IState {
  items: { [x: string]: DesignerItem };
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      items: {}
    };

    this.handleChangeItems = this.handleChangeItems.bind(this);
  }

  public render() {
    const { items } = this.state;

    return (
      <div>
        <h3 style={{ padding: 0 }}>React Designer Component</h3>
        <hr />
        <table>
          <thead>
            <tr>
              <th align="center">Designer</th>
              <th align="center">Props</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Designer
                  items={items}
                  onChangeItems={this.handleChangeItems}
                  fontApiKey="API_KEY"
                  paperSize={{
                    height: 300,
                    width: 600
                  }}
                />
              </td>
              <td>
                <ReactJson
                  collapseStringsAfterLength={50}
                  collapsed={2}
                  name="items"
                  style={{ height: 420, width: 400, overflow: "auto" }}
                  src={items}
                  theme="google"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  protected handleChangeItems(items: { [x: string]: DesignerItem }) {
    this.setState({ items });
  }
}

export default App;
