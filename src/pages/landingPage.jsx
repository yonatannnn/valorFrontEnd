// import React from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Separator } from "@/components/ui/separator"
// import { Bell, MessageCircle, Search, Share2, ThumbsUp, Trophy, Users } from 'lucide-react'

// export default function SportsSocialLayout() {
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
//         <div className="container flex h-16 items-center justify-between px-4">
//           <div className="flex items-center space-x-4">
//             <Trophy className="h-8 w-8" />
//             <span className="text-2xl font-bold">SportSocial</span>
//           </div>
//           <div className="hidden flex-1 items-center justify-center lg:flex">
//             <Input
//               className="w-1/2 bg-primary-foreground text-primary placeholder-primary/50"
//               placeholder="Search sports, teams, or players..."
//               type="search"
//             />
//           </div>
//           <div className="flex items-center space-x-4">
//             <Button variant="ghost" size="icon" className="text-primary-foreground">
//               <Bell className="h-5 w-5" />
//             </Button>
//             <Button variant="ghost" size="icon" className="text-primary-foreground">
//               <MessageCircle className="h-5 w-5" />
//             </Button>
//             <Avatar>
//               <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
//               <AvatarFallback>U</AvatarFallback>
//             </Avatar>
//           </div>
//         </div>
//         <div className="container flex lg:hidden">
//           <Input
//             className="w-full bg-primary-foreground text-primary placeholder-primary/50"
//             placeholder="Search sports, teams, or players..."
//             type="search"
//           />
//         </div>
//         <ScrollArea className="container py-2" orientation="horizontal">
//           <div className="flex space-x-4">
//             {Array.from({length: 12}).map((_, i) => (
//               <Avatar key={i} className="h-10 w-10 border-2 border-primary-foreground">
//                 <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={`Sport ${i + 1}`} />
//                 <AvatarFallback>S{i + 1}</AvatarFallback>
//               </Avatar>
//             ))}
//           </div>
//         </ScrollArea>
//       </header>

//       {/* Main Content */}
//       <div className="container grid grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[300px_1fr_240px]">
//         {/* Left Sidebar */}
//         <aside className="hidden space-y-6 md:flex md:flex-col">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <Trophy className="mr-2 h-5 w-5" />
//                 Leagues
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ul className="space-y-2">
//                 <li>Premier League</li>
//                 <li>La Liga</li>
//                 <li>NBA</li>
//                 <li>NFL</li>
//               </ul>
//               <Separator className="my-2" />
//               <div className="text-sm text-muted-foreground">
//                 <p>Active Leagues: 4</p>
//                 <p>Upcoming Matches: 12</p>
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <Users className="mr-2 h-5 w-5" />
//                 Teams
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ul className="space-y-2">
//                 <li>Manchester United</li>
//                 <li>Real Madrid</li>
//                 <li>LA Lakers</li>
//                 <li>Green Bay Packers</li>
//               </ul>
//               <Separator className="my-2" />
//               <div className="text-sm text-muted-foreground">
//                 <p>Followed Teams: 4</p>
//                 <p>Recent Updates: 7</p>
//               </div>
//             </CardContent>
//           </Card>
//         </aside>

//         {/* Main Feed */}
//         <main className="space-y-6">
//           {Array.from({length: 3}).map((_, i) => (
//             <Card key={i}>
//               <CardHeader className="flex flex-row items-center space-x-4">
//                 <Avatar>
//                   <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="Post author" />
//                   <AvatarFallback>PA</AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1">
//                   <h3 className="text-sm font-semibold">Post Author</h3>
//                   <p className="text-sm text-muted-foreground">2 hours ago</p>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <p>This is a sample post about sports. It could be about match predictions, analysis, or general discussion.</p>
//                 <div className="flex space-x-4">
//                   <Button variant="ghost" size="sm">
//                     <ThumbsUp className="mr-2 h-4 w-4" />
//                     Like
//                   </Button>
//                   <Button variant="ghost" size="sm">
//                     <MessageCircle className="mr-2 h-4 w-4" />
//                     Comment
//                   </Button>
//                   <Button variant="ghost" size="sm">
//                     <Share2 className="mr-2 h-4 w-4" />
//                     Share
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </main>

//         {/* Right Sidebar */}
//         <aside className="hidden space-y-4 md:flex md:flex-col">
//           <Card>
//             <CardHeader>
//               <CardTitle>Connect</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {Array.from({length: 5}).map((_, i) => (
//                 <div key={i} className="flex items-center space-x-4">
//                   <Avatar>
//                     <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={`Suggested user ${i + 1}`} />
//                     <AvatarFallback>U{i + 1}</AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1">
//                     <p className="text-sm font-medium">User {i + 1}</p>
//                     <p className="text-xs text-muted-foreground">Sports Enthusiast</p>
//                   </div>
//                   <Button variant="outline" size="sm">
//                     Follow
//                   </Button>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </aside>
//       </div>
//     </div>
//   )
// }