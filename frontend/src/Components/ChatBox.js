import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import {Box} from "@chakra-ui/react"
import SingleChat from './SingleChat'
const ChatBox = ({fetchAgain, setFetchAgain}) => {
  
  const {  selectedChat }= ChatState()


  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      align="center"
      justify="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ md: "450px", lg: "750px" }}
      h={{md:"350px", lg:"500px"}}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={ fetchAgain} setFetchAgain={setFetchAgain} />
 
    </Box>
    
  )
}

export default ChatBox