import { UserFromTokenQuery } from "../../generated/graphql";

interface Navbar {
	userFunction: () => UserFromTokenQuery | undefined;
}

export default Navbar;
