# Color constants
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

QUIET_MODE="${QUIET_MODE:-false}"

use_docker() {
	[ "$RUN_MODE" == "docker" ] && return 0 || return 1
}

header() {
	local header_length=48

	local len=${#1}

	local pad=$((header_length - len))

	local leftpad
	local rightpad=0
	if [ $((pad % 2)) -ne 0 ]; then
		rightpad=1
	fi

	leftpad=$((pad / 2))
	rightpad=$((pad / 2 + rightpad))

	repeat() {
		for ((i = 1; i <= $1; i++)); do echo -n "-"; done
	}

	if [ "$QUIET_MODE" != "true" ]; then
		echo -n -e "[${GREEN}INFO${NC}] "
		repeat $leftpad
		echo -n " $1 "
		repeat $rightpad
		echo
	fi
}

newline() {
	if [ "$QUIET_MODE" != "true" ]; then
		echo
	fi
}

log_info() {
	if [ "$QUIET_MODE" != "true" ]; then
		echo -e "[${GREEN}INFO${NC}] $1"
	fi
}

log_error() {
	if [ "$QUIET_MODE" != "true" ]; then
		echo -e "[${RED}ERROR${NC}] $1"
	fi
}
