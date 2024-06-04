import { SearchBox, Sidebar } from "./country/components"
import { SidebarProvider } from "./country/context/sidebar/SidebarProvider"
import { AppRouter } from "./router/AppRouter"

function App() {

  return (
    <SidebarProvider>
      <Sidebar/>
      <div className="home lg:pl-64 pt-[80px] relative">
        <SearchBox/>
        <AppRouter/>
      </div>
    </SidebarProvider>
  )
}

export default App
