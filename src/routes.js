import AuthLayout from "./pages/auth";
import MainLayout from "./pages/layout";
import Home from "./pages/Home";
import ProfileLayout from "./pages/profile/index";
import ProfilePosts from "./pages/profile/posts";
import ProfileSaved from "./pages/profile/saved";
import ProfileTagged from "./pages/profile/tagged";
import Login from "./pages/auth/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/auth/Register";
import DirectLayout from "./pages/message/index";
import Inbox from "./pages/message/inbox";
import MessageBox from "./pages/message/messagebox";
import Logout from "./pages/logout";

const routes = [
    {
        path: '/',
        element:<MainLayout/>,
        auth:true,
        children:[
            {
            index:true,
            element:<Home></Home>
            },
            {
                path:"logout",
                element:<Logout></Logout>
            },
            {
                path:':username',
                element:<ProfileLayout></ProfileLayout>,
                children:[
                    {
                        index:true,
                        element:<ProfilePosts></ProfilePosts>
                    },
                    {
                        path:'saved',
                        element:<ProfileSaved></ProfileSaved>
                    },
                    {
                        path:'tagged',
                        element:<ProfileTagged></ProfileTagged>
                    }
                ]

            },
            {
                path:'direct',
                element:<DirectLayout></DirectLayout>,
                children:[
                    {
                        path:'inbox',
                        element:<Inbox></Inbox>

                    },
                    {
                        path:'t/:messageboxid',
                        element:<MessageBox></MessageBox>

                    }
                ]
            }
        ]
        
    },
    {
        path:'auth',
        element:<AuthLayout/>,
        children:[
           { path:'login',
            element:<Login/>
            },
            {
                path:'register',
                element:<Register></Register>
            }
        ]

    }
]

const authCheck = routes => routes.map(route=>{
    if(route?.auth){
        route.element = <PrivateRoute>{route.element}</PrivateRoute>
    }
    if(route?.children){
        route.children = authCheck( route.children)
    }
    return route
})


export default authCheck(routes);