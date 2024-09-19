"use client";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { useLayout } from "../../components/layout/layout-context";
import { BsArrowRight } from "react-icons/bs";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import {
  PictureConnectionQuery, PictureConnectionQueryVariables
} from "../../tina/__generated__/types";
import { useTina } from "tinacms/dist/react";
import { Section } from "../../components/layout/section";
import { Container } from "../../components/layout/container";

const titleColorClasses = {
  blue: "group-hover:text-blue-600 dark:group-hover:text-blue-300",
  teal: "group-hover:text-teal-600 dark:group-hover:text-teal-300",
  green: "group-hover:text-green-600 dark:group-hover:text-green-300",
  red: "group-hover:text-red-600 dark:group-hover:text-red-300",
  pink: "group-hover:text-pink-600 dark:group-hover:text-pink-300",
  purple: "group-hover:text-purple-600 dark:group-hover:text-purple-300",
  orange: "group-hover:text-orange-600 dark:group-hover:text-orange-300",
  yellow: "group-hover:text-yellow-500 dark:group-hover:text-yellow-300"
};

interface ClientPictureProps {
  data: PictureConnectionQuery;
  variables: PictureConnectionQueryVariables;
  query: string;
}

export default function PicturesClientPage(props: ClientPictureProps) {
  const { data } = useTina({ ...props });
  const { theme } = useLayout();

  return (<Section className="flex-1">
      <Container width="large" className={`flex-1 pb-2`} size="large">
        <div className="grid grid-cols-3 gap-4">
          {data?.pictureConnection.edges.map((postData) => {
            const post = postData.node;
            const date = new Date(post.date);
            let formattedDate = "";
            if (!isNaN(date.getTime())) {
              formattedDate = format(date, "MMM dd, yyyy");
            }
            return (<Link
                key={post.id}
                href={`/posts/` + post._sys.breadcrumbs.join("/")}
                className="group block px-6 sm:px-8 md:px-10 py-10 mb-8 last:mb-0 bg-gray-50 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-1000 rounded-md shadow-sm transition-all duration-150 ease-out hover:shadow-md hover:to-gray-50 dark:hover:to-gray-800"
              >
                <h3
                  className={`text-gray-700 dark:text-white text-3xl lg:text-4xl font-semibold title-font mb-5 transition-all duration-150 ease-out ${titleColorClasses[theme.color]}`}
                >
                  {post.title}{" "}
                  <span className="inline-block opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                <BsArrowRight className="inline-block h-8 -mt-1 ml-1 w-auto opacity-70" />
              </span>
                </h3>
                <div className="prose dark:prose-dark w-full max-w-none mb-5 opacity-70">
                  <TinaMarkdown content={post.excerpt} />
                </div>
                <div className="flex items-center">
                  {formattedDate !== "" && (<>
                  <span className="font-bold text-gray-200 dark:text-gray-500 mx-2">
                    —
                  </span>
                      <p className="text-base text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150">
                        {formattedDate}
                      </p>
                    </>)}
                </div>
              </Link>);
          })}
        </div>
      </Container>
    </Section>);
}
