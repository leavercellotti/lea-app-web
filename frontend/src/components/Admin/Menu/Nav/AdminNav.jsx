import { Fragment } from "react";
import Media from "react-media";
import { NavALarge } from "../NavALarge/NavALarge";
import { NavASmall } from "../NavASmall/NavASmall";
import { NavBLarge } from "../NavBLarge/NavBLarge";
import AdminBanner from "../../AdminBanner/AdminBanner";

export default function AdminNav() {
    return(
        <>
            <AdminBanner/>
            <Media queries={{
                small: "(max-width: 850px)",
                medium_large: "(min-width: 850px)"
            }}>
                {matches => (
                <Fragment>
                    {matches.medium_large && 
                        <>
                            <NavALarge/>
                            <NavBLarge/>
                        </>
                    }
                    {matches.small && 
                        <NavASmall/>
                    }
                    </Fragment>
                )}
            </Media>
        </>
    )
}