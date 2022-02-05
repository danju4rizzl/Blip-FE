import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Account from 'components/Account/Account';
import Chains from 'components/Chains';
import TokenPrice from 'components/TokenPrice';
import ERC20Balance from 'components/ERC20Balance';
import ERC20Transfers from 'components/ERC20Transfers';
import DEX from 'components/DEX';
import NFTBalance from 'components/NFTBalance';
import Wallet from 'components/Wallet';
import { Layout, Tabs } from 'antd';
import 'antd/dist/antd.css';
import NativeBalance from 'components/NativeBalance';
import './style.css';
import QuickStart from 'components/QuickStart';
import Contract from 'components/Contract/Contract';
import Text from 'antd/lib/typography/Text';
import Ramper from 'components/Ramper';
import MenuItems from './components/MenuItems';
const { Header, Footer } = Layout;

const styles = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Roboto, sans-serif',
    color: '#041836',
    marginTop: '130px',
    padding: '10px',
  },
  header: {
    width: '100%',
    background: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Roboto, sans-serif',
    borderBottom: '2px solid rgba(0, 0, 0, 0.06)',
    padding: '0 10px',
    boxShadow: '0 1px 10px rgb(151 164 175 / 10%)',
  },
  headerRight: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    fontSize: '15px',
    fontWeight: '600',
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();
  const [isCollapsed, setIsCollapsed] = useState(true);
  useEffect(() => {
    const connectorId = window.localStorage.getItem('connectorId');
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Layout style={{ height: '100vh', overflow: 'auto' }} hasSider>
      <Router>
        {/* Sidebar */}
        <Layout.Sider
          breakpoint="lg"
          theme="light"
          collapsible
          collapsed={isCollapsed}
          onCollapse={handleCollapse}

        >
          <div><Logo /></div>
          <MenuItems />
        </Layout.Sider>
        <Layout>
          <Header style={styles.header}>
            <div>
              <Chains />
              <TokenPrice
                address="0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
                chain="eth"
                image="https://cloudflare-ipfs.com/ipfs/QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg/"
                size="40px"
              />
              <NativeBalance />
              <Account />
            </div>
          </Header>

          <div style={styles.content}>
            <Switch>
              <Route exact path="/quickstart">
                <QuickStart isServerInfo={isServerInfo} />
              </Route>
              <Route path="/wallet">
                <Wallet />
              </Route>
              <Route path="/1inch">
                <Tabs defaultActiveKey="1" style={{ alignItems: 'center' }}>
                  <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
                    <DEX chain="eth" />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab={<span>Binance Smart Chain</span>} key="2">
                    <DEX chain="bsc" />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab={<span>Polygon</span>} key="3">
                    <DEX chain="polygon" />
                  </Tabs.TabPane>
                </Tabs>
              </Route>
              <Route path="/erc20balance">
                <ERC20Balance />
              </Route>
              <Route path="/onramp">
                <Ramper />
              </Route>
              <Route path="/erc20transfers">
                <ERC20Transfers />
              </Route>
              <Route path="/nftBalance">
                <NFTBalance />
              </Route>
              <Route path="/contract">
                <Contract />
              </Route>
              <Route path="/">
                <Redirect to="/quickstart" />
              </Route>
              <Route path="/ethereum-boilerplate">
                <Redirect to="/quickstart" />
              </Route>
              <Route path="/nonauthenticated">
                <>Please login using the "Authenticate" button</>
              </Route>
            </Switch>
          </div>
          <Footer style={{ textAlign: 'center' }}>
            <Text style={{ display: 'block' }}>
              ⭐️ Please star this{' '}
              <a
                href="https://github.com/ethereum-boilerplate/ethereum-boilerplate/"
                target="_blank"
                rel="noopener noreferrer"
              >
                boilerplate
              </a>
              , every star makes us very happy!
            </Text>

            <Text style={{ display: 'block' }}>
              🙋 You have questions? Ask them on the {''}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://forum.moralis.io/t/ethereum-boilerplate-questions/3951/29"
              >
                Moralis forum
              </a>
            </Text>

            <Text style={{ display: 'block' }}>
              📖 Read more about{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://moralis.io?utm_source=boilerplatehosted&utm_medium=todo&utm_campaign=ethereum-boilerplat"
              >
                Moralis
              </a>
            </Text>
          </Footer>
        </Layout>
      </Router>
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: 'flex' }}>
    <svg
      width="100"
      height="50"
      viewBox="0 0 940 535"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="87" y="102" width="123" height="168" rx="61.5" fill="#E5CB44" />
      <rect x="87" y="280" width="123" height="168" rx="61.5" fill="#E5CB44" />
      <path
        d="M265.44 390V162.8H350.56C378.08 162.8 399.733 168.133 415.52 178.8C431.52 189.467 439.52 205.253 439.52 226.16C439.52 236.4 437.173 245.787 432.48 254.32C427.787 262.853 421.28 269.573 412.96 274.48C422.133 278.747 429.6 285.147 435.36 293.68C441.12 302 444 311.92 444 323.44C444 336.667 440.48 348.293 433.44 358.32C426.4 368.347 416.373 376.133 403.36 381.68C390.347 387.227 374.88 390 356.96 390H265.44ZM351.52 205.36H316.64V254.32H348.32C361.76 254.32 371.573 252.293 377.76 248.24C384.16 244.187 387.36 237.787 387.36 229.04C387.36 221.147 384.48 215.28 378.72 211.44C372.96 207.387 363.893 205.36 351.52 205.36ZM316.64 347.44H356.32C367.413 347.44 376.053 345.413 382.24 341.36C388.64 337.093 391.84 330.48 391.84 321.52C391.84 312.987 389.067 306.8 383.52 302.96C377.973 299.12 368.907 297.2 356.32 297.2H316.64V347.44ZM521.268 393.2C504.841 393.2 492.148 388.72 483.188 379.76C474.441 370.587 470.068 357.36 470.068 340.08V153.2H519.028V336.56C519.028 346.373 523.614 351.28 532.788 351.28C537.694 351.28 541.854 350.107 545.267 347.76L557.108 382.64C553.481 385.627 548.468 388.08 542.068 390C535.668 392.133 528.734 393.2 521.268 393.2ZM617.778 227.12V390H568.818V227.12H617.778ZM593.138 207.92C583.751 207.92 576.284 205.04 570.738 199.28C565.191 193.52 562.418 186.693 562.418 178.8C562.418 170.907 565.084 164.08 570.418 158.32C575.964 152.56 583.538 149.68 593.138 149.68C602.524 149.68 609.991 152.56 615.538 158.32C621.084 164.08 623.858 170.907 623.858 178.8C623.858 186.693 621.084 193.52 615.538 199.28C609.991 205.04 602.524 207.92 593.138 207.92ZM655.068 454V227.12H704.348L702.748 252.08C714.481 233.733 731.868 224.56 754.908 224.56C769.414 224.56 781.788 227.867 792.028 234.48C802.268 241.093 810.054 250.267 815.388 262C820.721 273.733 823.388 287.173 823.388 302.32C823.388 320.453 819.654 336.347 812.188 350C804.721 363.653 794.694 374.32 782.108 382C769.521 389.467 755.441 393.2 739.868 393.2C732.401 393.2 725.574 392.133 719.388 390C713.414 387.867 708.081 384.88 703.388 381.04L704.028 390V454H655.068ZM734.748 350.64C746.481 350.64 755.761 346.267 762.588 337.52C769.414 328.56 772.828 317.253 772.828 303.6C772.828 292.08 770.161 283.12 764.828 276.72C759.708 270.32 752.668 267.12 743.708 267.12C732.828 267.12 723.441 271.6 715.548 280.56C707.868 289.52 704.028 301.253 704.028 315.76C704.028 326.427 706.801 334.96 712.348 341.36C717.894 347.547 725.361 350.64 734.748 350.64Z"
        fill="#011E22"
      />
    </svg>
  </div>
);

export default App;
