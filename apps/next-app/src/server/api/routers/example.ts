import { z } from "zod";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { commonUtils } from "@ts-journey/common";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => ({
      greeting: `Hello ${input.text}`,
    })),

  getSecretMessage: protectedProcedure.query(
    () => "you can now see this secret message!",
  ),
  getUploadUrl: protectedProcedure.query(async () => {
    const command = new PutObjectCommand({
      ACL: "public-read",
      Key: crypto.randomUUID(),
      Bucket: commonUtils.getS3BucketName(
        commonUtils.BucketName.FILE_UPLOADS,
        process.env.SST_STAGE!,
      ),
    });
    const url = (await getSignedUrl(new S3Client({}), command)) as string;
    return url;
  }),
});
