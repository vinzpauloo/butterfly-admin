import { Stack } from "@mui/material"
import GoldCoinBundlesCard from "./components/GoldCoinBundlesCard"
import VIPBundlesCard from "./components/VIPBundlesCard"


const Bundles = () => {

	return (
		<Stack gap={10}>
			<VIPBundlesCard />
			<GoldCoinBundlesCard />
			{/* <VIPBundleModal/> and <GoldCoinBundleModal/>  should be rendered here instead*/}
			{/* after adding global store, store the info of current selected item when editing and pass to the modal */}
		</Stack>
	)
}

export default Bundles