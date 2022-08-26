import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../Context/ChatProvider'

function SingleChat({ fetchAgain, setFetchAgain }) {
    const { users, selectedChat, setSelectedChat }= ChatState()

  return (
      <>
          {
              selectedChat ? (
                  <>
                      <Text
                          fontSize={{ base: "28px", md: "30px" }}
                          pb={3}
                          px={2}
                          w="100%"
                          fontFamily="Work sans"
                          d="flex"
                          justify={{ base: "space-between" }}
                          align="center"
                      >
                          <IconButton
                              d={{ base: "flex", md: "none" }}
                              icon={<ArrowBackIcon />}
                              onClick={() => setSelectedChat("")}
                          />

                      </Text>
                  </>
              ) : (
                      <Box d="flex" align="center" justify="center" h="100%">
                          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                              Click on a user to start chatting
                          </Text>
                      </Box>
              )
      }
      </>
  )
}

export default SingleChat