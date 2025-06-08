"use client"
    import Link from 'next/link';
    import { cn } from '@/lib/utils';
    import { Button } from '@/components/ui/button';
    import { ScrollArea } from '@/components/ui/scroll-area';
    import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

    import { 
    LayoutDashboard,
    User,
    FolderOpen,
    Github,
    FileText,
    BarChart3,
    Map,
    Settings,
    Shield,
    Star,
    Menu
    } from 'lucide-react';
import { usePathname } from 'next/navigation';


    const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard,pro: false },
    { name: 'Profile', href: '/profile', icon: User ,pro: false},
    { name: 'Projects', href: '/project', icon: FolderOpen,pro: false },
    { name: 'GitHub', href: '/github', icon: Github },
    { name: 'Resume', href: '/resume', icon: FileText,pro: false },
    // { name: 'Analytics', href: '/analytics', icon: BarChart3, pro: true },
    // { name: 'AI Roadmap', href: '/roadmap', icon: Map, pro: true },
    { name: 'Settings', href: '/setting', icon: Settings ,pro: false},
    ];
 function SidebarContent() {
  const pathname = usePathname(); 
        

    return (
        <div className="flex h-full flex-col">

        
        <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
            {navigation.map((item) => {
                const isActive = pathname === item.href;
                const isPro = item.pro &&  'free'=== 'free';    // user?.plan at that place i just place free to fix ui
                
                return (
                <Button
                    key={item.name}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                    "w-full justify-start",
                    isPro && "opacity-50"
                    )}
                    asChild={!isPro}
                    disabled={isPro}
                >
                    {isPro ? (
                    <div className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                        <Star className="ml-auto h-3 w-3 text-amber-500" />
                    </div>
                    ) : (
                    <Link href={item.href} className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                    </Link>
                    )}
                </Button>
                );
            })}
            
            {/* {user?.isAdmin && (
                <>
                <div className="pt-4 pb-2">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
                    Admin
                    </h3>
                </div>
                <Button
                    variant={location.pathname === '/admin' ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    asChild
                >
                    <Link to="/admin">
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Panel
                    </Link>
                </Button>
                </>
            )} */}
            </nav>
        </ScrollArea>
        </div>
    );
    }

    export function Sidebar() {
    return (
        <>
        {/* Desktop Sidebar */}
        <div className="hidden md:flex h-full w-64 flex-col bg-background border-r">
            <SidebarContent />
        </div>

        {/* Mobile Sidebar */}
        <Sheet>
            <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden fixed top-3 left-4 z-40 h-8 w-8">
                <Menu className="h-4 w-4" />
            </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
            </SheetContent>
        </Sheet>
        </>
    );
    }
