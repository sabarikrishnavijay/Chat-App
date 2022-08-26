import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios'
import UserListItem from '../UserAvater/UserListItem'
import UserBadgeItem from '../UserAvater/UserBadgeItem'
function GroupChatModel({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState()
    const [seletedUsers, setSelectedUsers] = useState([])
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const { users, chats, setChats } = ChatState()


    const handleSearch = async (query) => {
        setSearch(query)
        if (!query) {
            return
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${users.token}`
                }
            }
            const { data } = await axios.get(`/api/user?search=${search}`, config)
            console.log(data)
            setLoading(false)
            setSearchResult(data)
        } catch (error) {
            toast({
                title: "Failed to Create the Chat!",
                description: error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

        }

    }
    const handleSubmit = async () => {
        if (!groupChatName || !seletedUsers) {
            toast({
                title: "Please fill all the feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            
            const config = {
                headers: {
                    Authorization:`Bearer ${users.token}`
                }
            }

            const { data } = await axios.post('/api/chat/group', {
                name: groupChatName,
                users:JSON.stringify(seletedUsers.map((u)=>u._id))
            },
                config)
            
            
            setChats([data, ...chats])
            onClose()
            toast({
                title: "New Group Chat Created!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

        } catch (error) {

            toast({
                title: "Failed to Create the Chat!",
                description: error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            
        }


    }
    const handleGroup = (userToAdd) => {
        if (seletedUsers.includes(userToAdd)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return
        }
        setSelectedUsers([...seletedUsers,userToAdd])
        
    }
    const handleDelete = (delUsers) => {
        setSelectedUsers(seletedUsers.filter(sel =>sel._id!==delUsers._id))

        
    }

    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent="center"
                    >Create group chats</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <ModalBody d='flex' flexDir='column' alignItems='center'>
                            <FormControl>
                                <Input
                                    placeholder="Chat Name"
                                    mb={3}
                                    onChange={(e) => setGroupChatName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <Input
                                    placeholder="Add Users eg: John, Piyush, Jane"
                                    mb={1}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </FormControl>
                            {seletedUsers.map(u => {
                                return (
                                    <UserBadgeItem
                                        key={u._id}
                                        user={u}
                                        handleFunction={() => handleDelete(u)}
                                    />
                           )
                       })}

                            {loading ? <div>loading</div> : (
                                searchResult?.slice(0, 4).map(user => {
                                    return (
                                        <UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)} />
                                    )
                                    
                                })
                            )}
                        </ModalBody>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' onClick={handleSubmit}>
                            Create Chat
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModel