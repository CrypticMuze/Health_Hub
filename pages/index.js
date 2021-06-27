import React,{Component} from 'react';
import factory from '../ethereum/factory.js'
import { Card,Button,Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import Layout from '../components/Layout'
import { Link } from '../routes'


class FactoryIndex extends Component {
  static async getInitialProps() {
    const fact = await factory.methods.getDeployedContracts().call();

    return { factory: fact }
  }

  renderFactory() {
    const items = this.props.factory.map(address => {
      return {
        header: address,
        description: (
        <Link route={`/Contracts/${address}`}>
          <a>View Contract</a>
        </Link>),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }

    //everything inside <Layout></Layout> will be sent as props.children

  render() {

    return (
    <Layout>
      <div>
        <br/>
        <h3>Open Contracts!</h3>
        <Link route='/Contracts/new'><a>
          <Button floated='right' content="Create Contract" icon="add circle" primary />
        </a></Link>
        {this.renderFactory()}
      </div>
    </Layout>
    );
  }
} 

export default FactoryIndex;

