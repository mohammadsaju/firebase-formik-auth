import { Redirect, Route } from "react-router";
import { useStateValue } from "../StateProvider";

const PrivetRoute = ({children, ...rest}) => {
    const [{user}] = useStateValue();
    return(
        <Route
            {...rest}
            render={({ location }) => user?.email ?
                children :
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: location }
                    }}
                ></Redirect>}
        >

        </Route>
    )
}

export default PrivetRoute;