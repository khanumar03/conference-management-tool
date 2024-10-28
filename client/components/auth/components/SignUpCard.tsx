import {FcGoogle} from "react-icons/fc";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";

export const SignUpCard = () => {
    return (
        <Card className="w-full h-full md:w-[487px] ">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2x;">Welcome Back!</CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <form className="space-y-4">
                    <div className="flex flex-row gap-2"><Input 
                    required
                    type="string"
                    value={""}
                    onChange={() => {}}
                    placeholder="Enter first name"
                    disabled={false}
                    min={8}
                    max={256}
                    />
                    <Input 
                    required
                    type="string"
                    value={""}
                    onChange={() => {}}
                    placeholder="Enter last name"
                    disabled={false}
                    min={8}
                    max={256}
                    /></div>
                    <Input 
                    required
                    type="string"
                    value={""}
                    onChange={() => {}}
                    placeholder="Enter organization name"
                    disabled={false}
                    min={8}
                    max={256}
                    />
                    <Input 
                    required
                    type="email"
                    value={""}
                    onChange={() => {}}
                    placeholder="Enter email address"
                    disabled={false}/>
                    <Input 
                    required
                    type="password"
                    value={""}
                    onChange={() => {}}
                    placeholder="Enter password"
                    disabled={false}
                    min={8}
                    max={256}
                    />
                    <Button disabled={false} size="lg" className="w-full">Sign Up</Button>
                </form>
            </CardContent>
            <div className="px-7">
                <DottedSeparator />
                <CardContent className="p-7 flex flex-col gap-y-4">
                    <Button variant="secondary" size="lg" className="w-full" disabled={false}>
                        <FcGoogle />
                        Login with Google
                    </Button>
                </CardContent>
            </div>
        </Card>
    );
}