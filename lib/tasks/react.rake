namespace :react do
  desc 'watch and jsx transform react components'
  task :build do
    exec 'rm -rf app/assets/javascripts/react && jsx --watch app/assets/react app/assets/javascripts/react'
  end
  desc 'remove trailing white spaces from transformed react components'
  task :clean do
    exec "sed -i '' -e's/[ \t]*$//' app/assets/javascripts/react/*.js"
  end
end
