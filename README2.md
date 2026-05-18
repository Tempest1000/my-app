# =========================================================
# 🔐 OpenSSL (Homebrew) - Add to PATH
# =========================================================
export PATH="${HOMEBREW_PREFIX}/opt/openssl/bin:$PATH"

# =========================================================
# 🧰 Local User Binaries - Add to PATH
# =========================================================
export PATH="$HOME/.local/bin:$PATH"

# =========================================================
# 📂 File Listing Aliases
# =========================================================
alias ll='ls -la'

# =========================================================
# 🌿 Git Shortcuts
# =========================================================
alias gs='git status'
alias ga='git add .'
alias gp='git push'
alias gl1l='git log --oneline --all --decorate'
alias gl1lg='git log --oneline --all --decorate --graph'

# =========================================================
# glpretty — Pretty, readable git log (default count = 7)
#
# Why this is a function:
#   - We want an optional numeric parameter with a default.
#
# Usage examples:
#   glpretty
#     → Shows the most recent 7 commits
#
#   glpretty 20
#     → Shows the most recent 20 commits
# =========================================================
unalias glpretty 2>/dev/null

glpretty() {
  local log_count="${1:-7}"

  # Validate that log_count is a positive integer
  if ! [[ "$log_count" =~ '^[0-9]+$' ]]; then
    echo "❌ Invalid argument: log count must be a positive integer."
    echo "✅ Usage: glpretty [log_count]"
    echo "   Example: glpretty 15"
    return 1
  fi

  git log \
    --pretty="%C(Yellow)%h  %C(reset)%ad (%C(Green)%cr%C(reset))%x09 %C(Cyan)%an: %C(reset)%s" \
    --date=short \
    --max-count="${log_count}"
}

# =========================================================
# gd — git diff (with pass-through arguments)
#
# Why this is a function:
#   - We want to accept and forward any diff arguments safely.
#
# Usage examples:
#   gd
#     → Shows unstaged differences
#
#   gd --staged
#     → Shows staged differences
#
#   gd --stat
#     → Shows a summary of changed files and line counts
#
#   gd HEAD~1..HEAD
#     → Shows differences between two revisions
# =========================================================
gd() {
  git diff "$@"
}

# =========================================================
# gb — git branch (with pass-through arguments)
#
# Why this is a function:
#   - We want to forward optional flags and branch names.
#
# Usage examples:
#   gb
#     → Lists local branches
#
#   gb --all
#     → Lists local and remote branches
#
#   gb --delete feature/foo
#     → Deletes the local branch named "feature/foo"
#
#   gb --move old-name new-name
#     → Renames a branch
# =========================================================
unalias gb 2>/dev/null

gb() {
  git branch "$@"
}

# =========================================================
# gc — git commit with a required message
#
# Why this is a function:
#   - We want to require a commit message and print a friendly error
#     instead of opening an editor unexpectedly.
#
# Usage examples:
#   gc "Added notes"
# =========================================================
gc() {
  if [[ -z "$1" ]]; then
    echo "❌ Commit message required."
    echo "✅ Usage: gc \"your commit message\""
    return 1
  fi

  git commit --message "$1"
}

# =========================================================
# gltag — Graph view of recent commits (useful for release/tag review)
#
# Usage:
#   gltag
# =========================================================
gltag() {
  git log \
    --pretty=oneline \
    --graph \
    --abbrev-commit \
    --max-count=20
}

# =========================================================
# 🚀 Vault Git Automation (gpn)
# Automatically:
#   - Stages all changes
#   - Commits with message "Added notes"
#   - Squashes last two commits into one
#   - Force pushes safely
# Can be run from anywhere (uses subshell)
# =========================================================
gpn() (
  REPO_DIR="/Users/andrewbaines/Vault"

  # Colors
  GREEN="\033[0;32m"
  RED="\033[0;31m"
  YELLOW="\033[1;33m"
  BLUE="\033[0;34m"
  NC="\033[0m"

  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${BLUE}🚀 Running gpn in Vault repo${NC}"
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

  cd "$REPO_DIR" || {
    echo -e "${RED}❌ Repo not found: $REPO_DIR${NC}"
    exit 1
  }

  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  echo -e "${YELLOW}📍 Branch:${NC} $CURRENT_BRANCH"

  echo -e "${BLUE}➜ Staging changes...${NC}"
  git add .

  if git diff --cached --quiet; then
    echo -e "${YELLOW}⚠️  Nothing to commit. Exiting cleanly.${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    exit 0
  fi

  echo -e "${BLUE}➜ Creating commit...${NC}"
  git commit -m "Added notes" || {
    echo -e "${RED}❌ Commit failed.${NC}"
    exit 1
  }

  COMMIT_COUNT=$(git rev-list --count HEAD)

  if [[ "$COMMIT_COUNT" -ge 2 ]]; then
    echo -e "${BLUE}➜ Squashing last two commits...${NC}"
    git reset --soft HEAD~2 || exit 1
    git commit -m "Added notes" || exit 1
  else
    echo -e "${YELLOW}⚠️  Not enough commits to squash.${NC}"
  fi

  echo -e "${BLUE}➜ Force pushing...${NC}"
  if git push --force-with-lease origin "$CURRENT_BRANCH"; then
    echo -e "${GREEN}✅ Success! Changes committed, squashed, and pushed.${NC}"
  else
    echo -e "${RED}❌ Push failed.${NC}"
    exit 1
  fi

  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
)
