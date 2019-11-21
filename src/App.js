import React from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import { Message, Header, Divider, Icon, Image, Item, Button, Container, Pagination, Placeholder } from 'semantic-ui-react';
import { PlaceholderVimeo, ItemVimeo } from './ComponentVimeo'



//Global Paramaters
const PATH_BASE = 'https://api.vimeo.com/channels/bestofthemonth/videos';
const PARAM_PAGE = 'page=';
const Authorization = 'bearer 57930b58a1a128c6c01489efd1ab3163'
// Convert Time minute to HH:MM
const timeconvert = (number) => {
  let hours = Math.floor(number / 60);
  let minutes = number % 60;
  let str = minutes.toString();
  if (minutes < 10) str = '0'.concat(str);
  return hours + ":" + str;
}

/**
 * Main Page
 */
function App() {
  return (
    <>
      <ModalContainer />
    </>
  );
}




/**
 * Modal Container for listing Videos Information 
 */
class ModalContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null,//Result for List videos 
      resulScroll: [],
      error: null,//For Error Handling
      isLoadingContent: false,//For spinner
      activePage: 1,//Current Page
      totalPages: null,//
      onScroll: false,
      usePagination: true,//Switch between Pagination and automatic scroll Listing 
      isLoadingContentScroll: false,

    }
    //function to get page of videos 
    this.fetchBestVideos = this.fetchBestVideos.bind(this);
    this.setBestVideos = this.setBestVideos.bind(this);

  }

  setBestVideos(result) {
    this.setState({ result });
  }

  fetchBestVideos(page = 1) {

    Axios.get(`${PATH_BASE}?${PARAM_PAGE}${page}`, { headers: { Authorization: Authorization } })
      .then(result => {
        //this.setBestVideos(result.data);

        this.setState({
          isLoadingContent: true,
          activePage: page,
          result: result.data.data,
          totalPages: result.data.per_page,
          resulScroll: [...this.state.resulScroll, ...result.data.data],
        });

      console.log(result);

      })
      .catch(error => this.setState({ error }));
  }
  //After mounting root node 
  componentDidMount() {
    this.fetchBestVideos();
    window.addEventListener('scroll', this.handleOnScroll);

  }
  //To handle Automatic Scroll 
  handleOnScroll = () => {
    let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    let clientHeight = document.documentElement.clientHeight || window.innerHeight;
    let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      this.fetchBestVideos(this.state.activePage + 1);
      this.setState({
        isLoadingContentScroll: true,
        activePage: this.state.activePage + 1,
        usePagination: false
      });

    }

  }
  //Pagination fire handeled 
  handlePaginationChange = (e, { activePage }) => {
    this.setState({
      isLoadingContent: false,
      activePage: activePage,
      usePagination: true
    });
    this.fetchBestVideos(activePage)
    //console.log(activePage);

  }
  render() {
    const {
      result,
      error,
      isLoadingContent,
      activePage,
      totalPages,
      resulScroll,
      usePagination,
      isLoadingContentScroll
    } = this.state;


    return (
      <div className='globalContainer'>
        <Header as='h1'  style={{marginTop: 25,marginBottom: 37}}> the best videos of the month in Vimeo </Header>

        {error ? <div>Somthing is wrong</div>
          : isLoadingContent ? (
            <Item.Group >

              <PaginationOrScroll result={usePagination ? result : resulScroll} />
              {isLoadingContentScroll ?
                <Message>

                  <p style={{textAlign:'center'}}>
                    Is loading more videos
                 </p>
                </Message> : null}
            </Item.Group>



          ) : (
              <>
                <PlaceholderVimeo />
                <Divider style={{ marginBottom: 24, Background: 'none' }} />
                <PlaceholderVimeo />
                <Divider style={{ marginBottom: 24, Background: 'none' }} />
                <PlaceholderVimeo />
                <Divider style={{ marginBottom: 24, Background: 'none' }} />
                <PlaceholderVimeo />
                <Divider style={{ marginBottom: 24, Background: 'none' }} />
                <PlaceholderVimeo />



              </>

            )
        }
        {totalPages && <Pagination
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






const PaginationOrScroll = (props) =>
  <>
    {props.result.map((item, i = 0) =>

      <>
        <ItemVimeo key={i++}
          imageurl={'https://i.vimeocdn.com/video'.concat(item.pictures.uri.match(/(?<=pictures).\d*/g))}
        
          name={item.name}
          description={item.description ? item.description : 'No description avaible'}
          duration={timeconvert(item.duration)}
          language={item.language ? item.language : 'No Language '}
          username={item.user.name}
        />
        <Divider style={{ marginBottom: 24, Background: 'none' }} />


      </>
    )}
  </>



export default App;



