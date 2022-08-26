import React, { useState } from 'react'

import { ChatState } from '../Context/ChatProvider'
import { Box, Flex, Spacer } from '@chakra-ui/react'
import SideDrawer from '../Components/miscellaneous/SideDrawer'
import MyChats from '../Components/miscellaneous/MyChats'
import ChatBox from '../Components/ChatBox'

function Chat() {
  const { users } = ChatState()
  const [fetchAgain,setFetchAgain]=useState()
  


  return (
    <div style={{ width: "100%" }}>

      {users && <SideDrawer />}

      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        <Flex>
          <Box
          W={'50%'}
          >
        {users && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
          </Box>
          <Spacer />
            
          <Box>

            {users && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
          </Box>
      

       </Flex>
    

      </Box>


    </div>
  )
}

export default Chat