import React from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import { Header,Divider, Icon, Image, Item, Button, Container, Pagination, Placeholder } from 'semantic-ui-react';
import { PlaceholderVimeo,ItemVimeo } from './ComponentVimeo'



const PATH_BASE = 'https://api.vimeo.com/channels/bestofthemonth/videos';
const PARAM_PAGE = 'page=';
const Authorization = 'bearer 57930b58a1a128c6c01489efd1ab3163'

const timeconvert = (number) => {
  let hours = Math.floor(number / 60);
  let minutes = number % 60;
  let str=minutes.toString();
  if(minutes<10) str='0'.concat(str);
  return hours + ":" + str;
}


function App() {
  return (
    <>
      <ModalContainer />
    </>
  );
}




class ModalContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null,//Result for List videos 
      error: null,//For Error Handling
      isLoadingContent: false,//For spinner
      activePage: 1,
      totalPages: null
    }
    //function to get page of videos 
    this.fetchBestVideos = this.fetchBestVideos.bind(this);
    this.setBestVideos = this.setBestVideos.bind(this);
  }

  setBestVideos(result) {
    this.setState({ result });
  }

  fetchBestVideos(page = 2) {
    let test = `${PATH_BASE}?${PARAM_PAGE}${page}`;
    console.log(test);
    Axios.get(`${PATH_BASE}?${PARAM_PAGE}${page}`, { headers: { Authorization: Authorization } })
      .then(result => {
        //this.setBestVideos(result.data);

        this.setState({
          isLoadingContent: true,
          result: result.data.data,
          totalPages: result.data.per_page
        });
        console.log(result.data);

      })
      .catch(error => this.setState({ error }));
  }
//After mounting root node 
  componentDidMount() {
    this.fetchBestVideos();

  }
  //Pagination fire handeled 
  handlePaginationChange = (e, { activePage }) => {
    this.setState({
      isLoadingContent: false,
       activePage:activePage
    });
    this.fetchBestVideos(activePage)
    console.log(activePage);
     
  }
  render() {
    const {
      result,
      error,
      isLoadingContent,
      activePage,
      totalPages
    } = this.state;


    return (
      <div className='globalContainer'>
        <Header as='h1'> the best videos of the month in Vimeo </Header>

        {error?<div>Somthing is wrong</div>
     :isLoadingContent ? (
      <Item.Group >
 
        {result.map(item =>
    
          <>
            <ItemVimeo
              imageurl={'https://i.vimeocdn.com'.concat(item.uri.split())}
              name={item.name}
              description={item.description}
              duration={timeconvert(item.duration)}
              language={item.language?item.language:'No Language '}
              username={item.user.name}
            />
            <Divider />


          </>
        )}
        
      </Item.Group>



    ) : (
        <>
          <PlaceholderVimeo />
          <Divider style={{ margin:18}}/>
          <PlaceholderVimeo />
          <Divider style={{ margin:18}}/>
          <PlaceholderVimeo />
          <Divider style={{ margin:18}}/>
          <PlaceholderVimeo />
          <Divider style={{ margin:18}}/>
          <PlaceholderVimeo />



        </>

      )
    }
          {totalPages&&<Pagination
              //activePage={activePage}
              activePage={activePage}
              onPageChange={this.handlePaginationChange}
              //defaultActivePage={5}
              totalPages={totalPages}
              ellipsisItem={false}
              className={'pagination'}
            />} 
      </div>

    )

  }
}








export default App;



