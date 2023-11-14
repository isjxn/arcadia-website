import React from "react";

import {Card, CardHeader, Avatar, Button} from "@nextui-org/react";

export default function App({ username, uuid, role, onPress } : {username: string, uuid: string, role: string, onPress: () => void}) {
  return (
    <Card className="w-auto">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={`https://api.mineatar.io/head/${uuid}?scale=16`} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{username}</h4>
            <h5 className="text-small tracking-tight text-default-400">{role}</h5>
          </div>
        </div>
        <Button
          className=""
          color="primary"
          radius="full"
          size="sm"
          variant="solid"
          onPress={onPress}
        >
          Über mich
        </Button>
      </CardHeader>
    </Card>
  );
}