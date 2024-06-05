import { SearchBox, Sidebar } from "./country/components"
import { SidebarProvider } from "./country/context/sidebar/SidebarProvider"
import { AppRouter } from "./router/AppRouter"

function App() {

  return (
    <SidebarProvider>
      <Sidebar/>
      <div className="home lg:pl-72 pt-[100px] relative">
        <SearchBox/>
        <AppRouter/>
      </div>
    </SidebarProvider>
  )
}

export default App
