import Navigation from "../components/Navigation"
import InboxItemList from "../components/inboxItemList"

function Inbox() {
    return(
        <div>
            <Navigation showSearchBar={false}/>
            
            <InboxItemList />
        </div>
    )
}

export default Inbox