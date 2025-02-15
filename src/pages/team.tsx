import { Divider, Spacer } from "@nextui-org/react";
import Head from "next/head";
import TeamCard from "~/components/TeamCard";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { db } from "~/server/db";
import type { TeamMember } from "@prisma/client";
import EditorJsRenderer from "~/components/EditorJsRenderer";
import type { OutputData } from "@editorjs/editorjs";

export const getStaticProps = async () => {
  const teamMembers: Array<TeamMember> = await db.teamMember.findMany();

  return {
    props: {
      teamMembers
    },
    revalidate: 10
  };
};

export default function Team({ teamMembers }: { teamMembers: Array<TeamMember> }) {
  return (
    <>
      <Head>
        <title>Arcadia | Team</title>
        <meta name="description" content="Arcadias Team | Hier stellen sich unsere Teammitglieder kurz vor, damit du uns besser kennenlernen kannst. Entdecke die Gesichter hinter unserem Projekt und erfahre mehr über die Menschen, die unsere Community gestalten." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Spacer y={4} />
      <div className="container mx-auto px-8">
        <p className="text-4xl pb-1">Unser Team</p>
        <p className="w-9/12">
          Willkommen auf unserer Team-Seite! Hier stellen sich unsere Teammitglieder kurz vor, damit du uns besser kennenlernen kannst.<br/>
          Entdecke die Gesichter hinter unserem Projekt und erfahre mehr über die Menschen, die unsere Community gestalten.
        </p>
      </div>
      <div className="container mx-auto px-4">
        <Divider className="my-8" />
      </div>
      <div className="container mx-auto gap-2 grid grid-cols-1 md:grid-cols-2 px-8">
        {teamMembers.map((member, index) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const { isOpen, onOpen, onOpenChange } = useDisclosure();
          return (
            (member.visible) &&
            <div key={index}>
              <TeamCard
                username={member.username}
                uuid={member.uuid}
                role={member.role}
                onPress={() => {
                  onOpen();
                }}
              />
              <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">Über {member.username}</ModalHeader>
                      <ModalBody>
                        <EditorJsRenderer data={JSON.parse(member.text) as OutputData} />
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                          Close
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          )
        })}
      </div>
    </>
  );
}
