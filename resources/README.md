# Resources

You need to run `go generate -tags mysql ./...` to download some resources manually.

## Postgresql

We will embed Postgres binaries to serve and store backend data. We will extract the binary to a binary path and install Postgres. We will use Go file suffix build tags to include the embedded file only for the build platform. For example, resources_darwin.go will only be included for building Bytebase on darwin platform.

linux/amd64 used for Linux (MD5 3b5b460450f09543f1055e7ffd1cf773): https://repo1.maven.org/maven2/io/zonky/test/postgres/embedded-postgres-binaries-linux-amd64/14.2.0/embedded-postgres-binaries-linux-amd64-14.2.0.jar

linux/arm64 used for Linux arm64 (MD5 db2d840c9a35d9cfb661a0fd9a690829): https://repo1.maven.org/maven2/io/zonky/test/postgres/embedded-postgres-binaries-linux-arm64v8/14.2.0/embedded-postgres-binaries-linux-arm64v8-14.2.0.jar

darwin/amd64 used for MacOS development (MD5 d95d5c5fccc1e1ef45de6533fd8e6d0a): https://repo1.maven.org/maven2/io/zonky/test/postgres/embedded-postgres-binaries-darwin-amd64/14.2.0/embedded-postgres-binaries-darwin-amd64-14.2.0.jar

## MySQL

We will embed MySQL binaries for testing. You need to run `go generate -tags mysql ./...` to download MySQL distributions first.

linux-glibc2.17-x86_64 used for Linux (MD5 55a7759e25cc527416150c8181ce3f6d): https://cdn.mysql.com//Downloads/MySQL-8.0/mysql-8.0.28-linux-glibc2.17-x86_64-minimal.tar.xz

macos11-arm64 used for MacOS Apple Silicon development (MD5 f1943053b12428e4c0e4ed309a636fd0): https://cdn.mysql.com//Downloads/MySQL-8.0/mysql-8.0.28-macos11-arm64.tar.gz

### mysqlutil

We embed mysqlutil for PITR. MySQL does not provide separate mysql, mysqldump and mysqlbinlog binaries, and we need to extract our files from the MySQL distribution manually.

linux-glibc2.17-x86_64 used for Linux (MD5 55a7759e25cc527416150c8181ce3f6d): https://cdn.mysql.com//Downloads/MySQL-8.0/mysql-8.0.28-linux-glibc2.17-x86_64-minimal.tar.xz, extract bin/mysqlbinlog, bin/mysql, bin/mysqldump, lib/private/libcrypto.so.1.1 and lib/private/libssl.so.1.1.

macos11-arm64 used for MacOS Apple Silicon development (MD5 f1943053b12428e4c0e4ed309a636fd0): https://cdn.mysql.com//Downloads/MySQL-8.0/mysql-8.0.28-macos11-arm64.tar.gz, extract bin/mysqlbinlog, bin/mysql, bin/mysqldump, lib/libcrypto.1.1.dylib and lib/libssl.1.1.dylib.

macos11-x86_64 used for MacOS Intel Silicon development (MD5 b2d5b57edb92811040fd61c84f1c9d6f): https://cdn.mysql.com/archives/mysql-8.0/mysql-8.0.28-macos11-x86_64.tar.gz, extract bin/mysqlbinlog, bin/mysql, bin/mysqldump, lib/libcrypto.1.1.dylib and lib/libssl.1.1.dylib.
