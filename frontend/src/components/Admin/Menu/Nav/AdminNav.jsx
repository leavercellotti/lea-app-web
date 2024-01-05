import { Fragment } from "react";
import Media from "react-media";
import { NavALarge } from "../NavALarge/NavALarge";
import { NavASmall } from "../NavASmall/NavASmall";
import { NavBLarge } from "../NavBLarge/NavBLarge";

export default function AdminNav() {
    return(
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
    )
}