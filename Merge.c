/**
 * Merge multiple .js file into one .js file
 *
 * Arguments
 *
 * [0] file to create
 * [1...] files to merge
 */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

char* getCurrentTime();

int main(int argc, char *argv[])
{
	int argi = 1;
	FILE *fp_from;
	FILE *fp_to;

	char *from_name;
	char c;

	if(argc - 1 < 2)
	{
		printf("Usage: <file to create> <file to merge...>\n");
		return 0;
	}

	from_name = argv[argi++];
	fp_to = fopen(from_name, "w");

	fprintf(fp_to, "/**\n");
	fprintf(fp_to, " *  ____  _            _    _ _ \n");
	fprintf(fp_to, " * | __ )| | __ _  ___| | _(_) |_ \n");
	fprintf(fp_to, " * |  _ \\| |/ _` |/ __| |/ / | __| \n");
	fprintf(fp_to, " * | |_) | | (_| | (__|   <| | |_ \n");
	fprintf(fp_to, " * |____/|_|\\__,_|\\___|_|\\_\\_|\\__| \n");
	fprintf(fp_to, " * \n");
	fprintf(fp_to, " * A script which can evaluate on-the-fly for ModPE developer \n");
	fprintf(fp_to, " * \n");
	fprintf(fp_to, " * This code was generated at %s\n", getCurrentTime());
	fprintf(fp_to, " */\n");

	for(; argi < argc; argi++)
	{
		fp_from = fopen(argv[argi], "r");
		if(fp_from == NULL)
		{
			printf("Cannot open file %s\n", argv[argi]);
			continue;
		}
		printf("Adding file %s into %s ...\n", argv[argi], from_name);

		fprintf(fp_to, "\n\n\n");
		fprintf(fp_to, "/**\n");
		fprintf(fp_to, " * Original file: %s\n", argv[argi]);
		fprintf(fp_to, " */\n");

		while((c = fgetc(fp_from)) != EOF)
		{
			fputc(c, fp_to);
		}
		fprintf(fp_to, "\n");
		fclose(fp_from);
	}

	fclose(fp_to);

	printf("\nMerge complete!\n");

	return 0;
}

char* getCurrentTime()
{
	static char s[20];
	time_t timer = time(NULL);
	struct tm *t = localtime(&timer);

	sprintf(s, "%04d-%02d-%02d %02d:%02d:%02d",
		t->tm_year + 1900, t->tm_mon + 1, t->tm_mday,
		t->tm_hour, t->tm_min, t->tm_sec
	);

	return s;
}