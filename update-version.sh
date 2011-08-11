#!/bin/bash
git describe --match='tester-*' HEAD 2>/dev/null | sed s/tester-// >VERSION
