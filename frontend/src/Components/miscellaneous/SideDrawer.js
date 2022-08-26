import {
    Avatar,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Input,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Spacer,
    Spinner,
    Text,
    Tooltip,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import React, { useState } from 'react'
import NotificationBadge from "react-notification-badge";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from '../../Context/ChatProvider';
import ProfileModel from './ProfileModel';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvater/UserListItem';

function SideDrawer() {
    const navigate = useNavigate()
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);


    const { users, setSelectedChat, chats, setChats } = ChatState()
    const { user, token } = users

    const { isOpen, onOpen, onClose } = useDisclosure();

    const logoutHandler = () => {
        localStorage.removeItem('userInfo')
        navigate('/')
    }

    const toast = useToast()

    const handleSearch = async () => {
        console.log(user);
        console.log(token);
        console.log('sidedrawer');
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }

        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axios.get(`/api/user?search=${search}`, config)
            setLoading(false)
            setSearchResult(data)
            console.log(data);

        } catch (error) {

            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true)

            const config = {
                headers: {

                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`

                }

            }
            const { data } = await axios.post('/api/chat', { userId }, config)

            if(!chats.find((c)=>c.id===data._id)) setChats([data, ...chats])
            setSelectedChat(data)
            setLoadingChat(false)
            onClose()
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });

        }

    }

    return (
        <Box d="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="white"
            w="100%"
            p="5px 10px 5px 10px"
            borderWidth="5px">
            <Flex>
                <Box>


                    <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
                        <Button variant="ghost" onClick={onOpen}>
                            <i className="fas fa-search"></i>
                            <Text d={{ base: "none", md: "flex" }} px={4}>
                                Search User
                            </Text>
                        </Button>
                    </Tooltip>
                </Box>


                <Spacer />
                <Box>
                    <Text fontSize="2xl" fontFamily="Work sans">
                        Talk-A-Tive

                    </Text>
                </Box>
                <Spacer />
                <Box>
                    <div>
                        <Menu>
                            <MenuButton p={1}>
                                <NotificationBadge

                                />
                                <BellIcon fontSize="2xl" m={1} />
                            </MenuButton>
                            <MenuList pl={2}>

                            </MenuList>
                        </Menu>
                        <Menu>
                            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
                                <Avatar
                                    size="sm"
                                    cursor="pointer"
                                    name={user.name}


                                />
                            </MenuButton>
                            <MenuList>

                                <ProfileModel user={user}>

                                    <MenuItem >My Profile</MenuItem>
                                </ProfileModel>
                                <MenuDivider />
                                <MenuItem onClick={() => logoutHandler()} >Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </Box>


                <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                        <DrawerBody>
                            <Box d="flex" pb={2}>
                                <Input
                                    placeholder="Search by name or email"
                                    mr={2}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button onClick={handleSearch} >Go</Button>
                            </Box>
                            {loading ? (
                                <ChatLoading />

                            ) : (
                                searchResult?.map(user => {
                                    return <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => accessChat(user._id)}
                                    />
                                })
                            )
                            }

                            {loadingChat && <Spinner ml="auto" d="flex" />}
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>


            </Flex>
        </Box>
    )
}

export default SideDrawer