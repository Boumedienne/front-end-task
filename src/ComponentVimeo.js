import React  from 'react';
import {  Popup,Button, Icon, Item, Label,Container,Header, Grid,Image ,Placeholder } from 'semantic-ui-react';


const getLimitText = (text, CharacterLimit) => {
     let more=false;
    if(text!=null){
     if(text.length <CharacterLimit)  
      return {
       text:text,
       more:more,
      };
     else{
        if ((text.constructor === String) ) {
          more=true;
          let str=text.slice(0, CharacterLimit).concat('...');
          return {
            text:str,
            more:more,
           };
        }}}
        else return  {
          text:'',
          more:more,
         };
    };

export  const  PlaceholderVimeo  = ()=>(
    <Grid>
    <div>
    <Placeholder>
      <Placeholder.Image   style={{ height: 156, width: 280,top:10 }}/>
    </Placeholder>
   </div>
    <Grid.Column width={12} style={{ marginTop:29}}> 
    <Placeholder fluid>
    <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
    </Placeholder>
    </Grid.Column>
    
  </Grid>
  )

  export  const  ItemVimeo  = (props)=>{
    const {text, more}=getLimitText(props.description,400)
   return( <Grid>
    <div>
      <Image src={props.imageurl} style={{ height: 156, width: 280 ,top:10}}/>
      
      <span className='duration'>{props.duration}</span>
    </div>
    <Grid.Column width={12} > 
  <Header>{props.name}</Header>

      <Container>
       <p>
      {
       
       more?(<>
        {text} 
        <Popup 
        content={props.description}
        on='click'
        pinned
        trigger={<a>   continue</a>} />
        </>):text
       
     
      }

       </p>
    </Container>
    <Item>
    <Item.Extra>
          <Label primary floated='right'>
            <Icon name='language' />:
            {props.language}
            
          </Label>
          <Label >
            <Icon name='user circle' />
            {props.username}
            
          </Label>
        </Item.Extra>

    </Item>
    </Grid.Column>
    
  </Grid>
  )};

